import React from 'react';
import { TransactionTableRow } from "./TransactionTableRow";
import { Transaction, useTransactions } from '../../state/transactions';

export const TransactionsTable = ({ providedTransactions }: { providedTransactions?: Transaction[] }) => {
  const transactions = useTransactions();
  const t = providedTransactions ? providedTransactions : transactions;

  return (<>
    <div className='w-full'>
      <table className="w-full table-auto border-y border-slate-300 border-collapse">
        <tbody>
          {t.map(tr => <TransactionTableRow transaction={tr} key={tr.id} />)}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </>);
};
