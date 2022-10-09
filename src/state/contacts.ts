import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

 export interface Contact {
  id: string;
  label: string;
  note: string;
  address: string;
  type: string; // family, friend, coworker, investor
}

export interface ContactsState {
  set: (fn: (sta: ContactsState) => void) => void;
  batchSet: (fn: (sta: ContactsState) => void) => void;
  contacts: Contact[];
  add: (contact: Contact) => void;
  edit: (contact: Contact) => void;
  del: (id: string) => void;
}

export const useContactsState = create<ContactsState>()(
  persist<ContactsState>(
    (set, get) => ({
      set: (fn) => {
        set(produce(get(), fn));
      },
      batchSet: (fn) => {
        batchUpdates(() => {
          get().set(fn);
        });
      },
      contacts: [],
      add: (contact) => {
        get().batchSet((draft) => {
          draft.contacts = [...draft.contacts, contact]
        })
      },
      edit: (contact) => {
        get().batchSet((draft) => {
          draft.contacts = [...draft.contacts.slice().filter(w => w.id !== contact.id), contact]
        })
      },
      del: (id) => {
        get().batchSet((draft) => {
          draft.contacts = [...draft.contacts.slice().filter(w => w.id !== id)]
        })
      },
    }),
    {
      name: 'contacts',
      // @ts-expect-error see: https://docs.pmnd.rs/zustand/integrations/persisting-store-data#partialize
      partialize: ({ contacts }) => ({ contacts }),
    }
  )
);

const selContacts = (s: ContactsState) => s.contacts;
export function useContacts() {
  return useContactsState(selContacts);
}
