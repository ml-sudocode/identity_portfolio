import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import { Wallet as EthWallet } from 'ethers';

export interface Wallet {
  id: string;
  ethWallet: EthWallet | null;
  label: string;
  tags: string[];
  keystore: string | null;
  balance: number;
  // transactions: Transaction[]; TODO
}

export interface WalletsState {
  set: (fn: (sta: WalletsState) => void) => void;
  batchSet: (fn: (sta: WalletsState) => void) => void;
  initialized: boolean;
  wallets: Wallet[];
  passphrase: string | null;
  setPassphrase: (p: string) => void;
  add: (wallet: Wallet) => void;
  edit: (wallet: Wallet) => void;
  del: (id: string) => void;
  lock: (id: string) => Promise<void>;
  unlock: (id: string) => void;
}

export const useWalletsState = create<WalletsState>((set, get) => ({
  set: (fn) => {
    set(produce(get(), fn));
  },
  batchSet: (fn) => {
    batchUpdates(() => {
      get().set(fn);
    });
  },
  initialized: false,
  wallets: [],
  passphrase: null,
  setPassphrase: (p: string | null) => {
    get().batchSet((draft) => {
      draft.passphrase = p;
    })
  },
  add: (wallet) => {
    get().batchSet((draft) => {
      draft.wallets = [...draft.wallets, wallet]
    })
  },
  edit: (wallet) => {
    get().batchSet((draft) => {
      draft.wallets = [...draft.wallets.slice().filter(w => w.id !== wallet.id), wallet]
    })
  },
  del: (id) => {
    get().batchSet((draft) => {
      draft.wallets = [...draft.wallets.slice().filter(w => w.id !== id)]
    })
  },
  lock: async (id) => {
    const p = get().passphrase;
    if(!p) {
      throw new Error('Passphrase must be set');
    }
    const w = get().wallets.find(w => w.id === id);
    let lockedWallet: Wallet;
    if(w && w.ethWallet) {
      lockedWallet = Object.assign({}, w);
      lockedWallet.keystore = await w.ethWallet.encrypt(p);
    }

    get().batchSet((draft) => {
      draft.wallets = [...draft.wallets.slice().filter(w => w.id !== id), lockedWallet]
    })    
  },
  unlock: async (id) => {
    const p = get().passphrase;
    if(!p) {
      throw new Error('Passphrase must be set');
    }
    const w = get().wallets.find(w => w.id === id);
    let unlockedWallet: Wallet;
    if(w && w.keystore) {
      unlockedWallet = Object.assign({}, w);
      unlockedWallet.ethWallet = await EthWallet.fromEncryptedJson(w.keystore, p);
    }

    get().batchSet((draft) => {
      draft.wallets = [...draft.wallets.slice().filter(w => w.id !== id), unlockedWallet]
    })  
  }
}));

const selWallets = (s: WalletsState) => s.wallets;
export function useWallets() {
  return useWalletsState(selWallets);
}

export function useWallet(id?: string) {
  const selWallet = (s: WalletsState) => s.wallets.find(w => w.id === id);
  return useWalletsState(selWallet);
}
