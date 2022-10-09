import React, { useEffect, useMemo, useState } from "react";
import Fuse from 'fuse.js'
import { useTransactions } from "../../state/transactions";
import useFuzzyTransactions from "../../lib/useFuzzyTransactions";
import AddTransactionButton from "../transactions/AddTransactionButton";
import { TransactionsTable } from "../transactions/TransactionsTable";
import { TransactionsSummary } from "../transactions/TransactionsSummary";
import { Link } from "react-router-dom";
import AddContactButton from "../contacts/AddContactButton";
import AddAddressButton from "../addresses/AddAddressButton";
import AddWalletButton from "../wallets/AddWalletButton";

export default function ActionsIndex() {
  return <>
    <h1 className='text-2xl'><Link to={'/home'} className='text-gray-500'>Home /</Link> Actions</h1>
    <div className="buttons-container">
      <AddWalletButton />
      <AddAddressButton />
      <AddTransactionButton />
      <AddContactButton />
    </div>
  </>
}
