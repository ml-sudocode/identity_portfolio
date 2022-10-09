import React from 'react';
import { Route, Routes } from "react-router-dom"
import { TransactionsDetail } from './TransactionsDetail';
import { TransactionsEdit } from './TransactionsEdit';
import TransactionsIndex from './TransactionsIndex';
import { TransactionsNew } from './TransactionsNew';

export const Transactions = () => {
  return (<>
    <Routes>
      <Route path="/" element={<TransactionsIndex />} />
      <Route path="/new" element={<TransactionsNew />} />
      <Route path="/show/:id" element={<TransactionsDetail />} />
      <Route path="/edit/:id" element={<TransactionsEdit />} />
    </Routes>
  </>)
}
