import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';

export interface Wallet {
  id: string;
  label: string;
  description: string;
  slug: string;
  backupLocation: string;
  
}

export interface WalletsState {
  set: (fn: (sta: WalletsState) => void) => void;
  batchSet: (fn: (sta: WalletsState) => void) => void;
  wallets: Wallet[];
  add: (wallet: Wallet) => void;
  edit: (wallet: Wallet) => void;
  del: (id: string) => void;
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
  wallets: [],
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
}));

const selWallets = (s: WalletsState) => s.wallets;
export function useWallets() {
  return useWalletsState(selWallets);
}

export function useWallet(id?: string) {
  const selWallet = (s: WalletsState) => s.wallets.find(w => w.id === id);
  return useWalletsState(selWallet);
}

export function useWalletFromSlug(slug?: string | null) {
  const selWallet = (s: WalletsState) => s.wallets.find(i => i.slug === slug);
  return useWalletsState(selWallet);
}
