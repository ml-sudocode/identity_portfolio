import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

 export interface Transaction {
  id: string;
  date: number;
  note: string;
  amount: number;
  type: string; // investment, payment, registration, income, staking yield, lending
  addressId: string;
}

export interface TransactionsState {
  set: (fn: (sta: TransactionsState) => void) => void;
  batchSet: (fn: (sta: TransactionsState) => void) => void;
  transactions: Transaction[];
  add: (transaction: Transaction) => void;
  edit: (transaction: Transaction) => void;
  del: (id: string) => void;
}

export const useTransactionsState = create<TransactionsState>()(
  persist<TransactionsState>(
    (set, get) => ({
      set: (fn) => {
        set(produce(get(), fn));
      },
      batchSet: (fn) => {
        batchUpdates(() => {
          get().set(fn);
        });
      },
      transactions: [],
      add: (transaction) => {
        get().batchSet((draft) => {
          draft.transactions = [...draft.transactions, transaction]
        })
      },
      edit: (transaction) => {
        get().batchSet((draft) => {
          draft.transactions = [...draft.transactions.slice().filter(w => w.id !== transaction.id), transaction]
        })
      },
      del: (id) => {
        get().batchSet((draft) => {
          draft.transactions = [...draft.transactions.slice().filter(w => w.id !== id)]
        })
      },
    }),
    {
      name: 'transactions',
      // @ts-expect-error see: https://docs.pmnd.rs/zustand/integrations/persisting-store-data#partialize
      partialize: ({ transactions }) => ({ transactions }),
    }
  )
);

const selTransactions = (s: TransactionsState) => s.transactions;
export function useTransactions() {
  return useTransactionsState(selTransactions);
}
