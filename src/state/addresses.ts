import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { useTransactions } from './transactions';

export interface Address {
  id: string;
  address: string;
  label: string;
  description: string;
  purpose: string[];
  walletId: string;
  // https://usedapp-docs.netlify.app/docs/Guides/Connecting/Multi%20Chain#add-kovan-network-to-the-config
  // networks: mainnet, goerli, optimism, avalanche
  // walletId: fk to Wallet
  // assetTypes: token, NFT, 
  // notes: free input
  // purpose: hodl, defi, nft, investing, friends, testing, hackathons, conferences, daos
  // backupLocations
  // loadedLocations
  // transactions: Transaction[]; TODO
}

export interface AddressesState {
  set: (fn: (sta: AddressesState) => void) => void;
  batchSet: (fn: (sta: AddressesState) => void) => void;
  addresses: Address[];
  add: (address: Address) => void;
  edit: (address: Address) => void;
  del: (id: string) => void;
}

export const useAddressesState = create<AddressesState>()(
  persist<AddressesState>(
    (set, get) => ({
      set: (fn) => {
        set(produce(get(), fn));
      },
      batchSet: (fn) => {
        batchUpdates(() => {
          get().set(fn);
        });
      },
      addresses: [],
      add: (address) => {
        get().batchSet((draft) => {
          draft.addresses = [...draft.addresses, address]
        })
      },
      edit: (address) => {
        get().batchSet((draft) => {
          draft.addresses = [...draft.addresses.slice().filter(w => w.id !== address.id), address]
        })
      },
      del: (id) => {
        get().batchSet((draft) => {
          draft.addresses = [...draft.addresses.slice().filter(w => w.id !== id)]
        })
      },
    }),
    {
      name: 'addresses',
      // @ts-expect-error see: https://docs.pmnd.rs/zustand/integrations/persisting-store-data#partialize
      partialize: ({ addresses }) => ({ addresses }),
    }
  )
);

const selAddresses = (s: AddressesState) => s.addresses;
export function useAddresses() {
  return useAddressesState(selAddresses);
}

export function useAddress(id?: string) {
  const selAddress = (s: AddressesState) => s.addresses.find(w => w.id === id);
  return useAddressesState(selAddress);
}

export function useAddressesForWallet(walletId?: string) {
  const addresses = useAddresses();
  if(!walletId) return [];
  return addresses.filter(a => a.walletId === walletId);
}

export function useAddressBalance() {
  const transactions = useTransactions();

  const addressBalance = (addressId: string) => {
    return transactions.filter(t => t.addressId === addressId)
      .reduce((memo, t) => memo + t.amount, 0)
  }

  return {
    addressBalance
  }
}
