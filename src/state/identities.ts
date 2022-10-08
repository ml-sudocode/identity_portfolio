import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';

export interface Identity {
  id: string;
  label: string;
  description: string;
  slug: string;
}

export interface IdentitiesState {
  set: (fn: (sta: IdentitiesState) => void) => void;
  batchSet: (fn: (sta: IdentitiesState) => void) => void;
  identities: Identity[];
  add: (identity: Identity) => void;
  edit: (identity: Identity) => void;
  del: (id: string) => void;
}

export const useIdentitiesState = create<IdentitiesState>((set, get) => ({
  set: (fn) => {
    set(produce(get(), fn));
  },
  batchSet: (fn) => {
    batchUpdates(() => {
      get().set(fn);
    });
  },
  identities: [],
  add: (identity) => {
    get().batchSet((draft) => {
      draft.identities = [...draft.identities, identity]
    })
  },
  edit: (identity) => {
    get().batchSet((draft) => {
      draft.identities = [...draft.identities.slice().filter(w => w.id !== identity.id), identity]
    })
  },
  del: (id) => {
    get().batchSet((draft) => {
      draft.identities = [...draft.identities.slice().filter(w => w.id !== id)]
    })
  },
}));

const selIdentities = (s: IdentitiesState) => s.identities;
export function useIdentities() {
  return useIdentitiesState(selIdentities);
}

export function useIdentityFromSlug(slug?: string) {
  const selIdentity = (s: IdentitiesState) => s.identities.find(i => i.slug === slug);
  return useIdentitiesState(selIdentity);
}
