import React from 'react';
import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { presentEthAddress } from '../../lib/utils';
import { useTransactions } from '../../state/transactions';
import TransactionsForm from './TransactionsForm';

export const TransactionsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const transactions = useTransactions();
  const editingTransaction = useMemo(() => {
    if(!transactions) { return };

    return transactions.find(i => i.id === id); // TODO: use string / uuid
  }, [transactions, id]);

  if(!editingTransaction) {
    navigate('/transactions');
  }

  return (<>
    <h1 className='text-2xl'><Link to={'/transactions'} className='text-gray-500'>Transactions /</Link> <code>{editingTransaction ? presentEthAddress(editingTransaction?.txHash) : null}</code></h1>
    <TransactionsForm transaction={editingTransaction} />
  </>)
}
