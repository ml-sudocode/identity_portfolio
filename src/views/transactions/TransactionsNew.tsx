import React from 'react';
import { Link } from 'react-router-dom';
import { isDevelopment } from '../../lib/flags';
import AddFakeTransactionButton from "./AddFakeTransactionButton"
import TransactionsForm from './TransactionsForm';

export const TransactionsNew = () => {
  return (<>
    <h1 className='text-2xl'><Link to={'/transactions'} className='text-gray-500'>Transactions /</Link> Add</h1>
    { isDevelopment ? <AddFakeTransactionButton /> : null }
    <TransactionsForm />
  </>)
}
