import React from 'react';
import { pluralize, presentBalance } from '../../lib/utils';
import { useTransactions, useTransactionsForAddress } from '../../state/transactions';

export const TransactionsSummary = ({ addressId }: { addressId?: string }) => {
  const transactions = useTransactions();
  const addressTransactions = useTransactionsForAddress(addressId);
  const t = addressId ? addressTransactions : transactions;
  
  const total = t.reduce((memo, tr) => memo + tr.amount, 0);

  return <div>
    {presentBalance(total)} ETH across {transactions.length} {pluralize('transaction', transactions.length)}
  </div>
}
