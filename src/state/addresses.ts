import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import { Network } from '@usedapp/core';

export interface Address {
  id: string;
  value: string;
  label: string;
  tags: string[];
  balance: number;
  // https://usedapp-docs.netlify.app/docs/Guides/Connecting/Multi%20Chain#add-kovan-network-to-the-config
  // networks: mainnet, goerli, optimism, avalanche
  // identityId: fk to Identity
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

export const useAddressesState = create<AddressesState>((set, get) => ({
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
}));

const selAddresses = (s: AddressesState) => s.addresses;
export function useAddresses() {
  return useAddressesState(selAddresses);
}

export function useAddress(id?: string) {
  const selAddress = (s: AddressesState) => s.addresses.find(w => w.id === id);
  return useAddressesState(selAddress);
}
