import React from 'react';
import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { presentBalance } from '../../lib/utils';
import { useAddress, useAddressBalance } from '../../state/addresses';
import { useTransactionsForAddress } from '../../state/transactions';
import { useWallet } from '../../state/wallets';
import AddTransactionButton from '../transactions/AddTransactionButton';
import { TransactionsSummary } from '../transactions/TransactionsSummary';
import { TransactionsTable } from '../transactions/TransactionsTable';
import DeleteAddressButton from './DeleteAddressButton';
import EditAddressButton from './EditAddressButton';

export const AddressesDetail = () => {
  const { id } = useParams<{id: string}>();
  const address = useAddress(id);
  const wallet = useWallet(address?.walletId);
  const navigate = useNavigate();
  const addressTransactions = useTransactionsForAddress(address?.id);
  const { addressBalance } = useAddressBalance();
  if(!address) { navigate('/') }

  return address ? 
      (
        <>
        <h1 className='text-2xl'><Link to={'/addresses'} className='text-gray-500'>Addresses /</Link> {address?.label}</h1>
        <div className="buttons-container">
          <EditAddressButton id={address.id} />
          <DeleteAddressButton id={address.id} />
        </div>
        <section className="my-4">
          <h2 className="text-xl my-4">Address</h2>
          <p><code>{address.address}</code></p>
        </section>
        <section className="my-4">
          <h2 className="text-xl my-4">Wallet</h2>
          {
            wallet ? (
              <Link to={`/wallets/show/${wallet.slug}`}>{wallet.label}</Link>
            ) : (
              <p>Not associated with a wallet</p>
            )
          }
        </section>
        <section className="my-4">
          <h2 className="text-xl my-4">Balance</h2>
          <p>{presentBalance(addressBalance(address.id))} ETH</p>
        </section>
        <section className="my-4">
          <h2 className="text-xl my-4">Description</h2>
          <p>{address.description}</p>
        </section>
        <section className="my-4">
          <h2 className="text-xl my-4">Purpose</h2>
          <div className='space-x-2'>{address.purpose.map(t => <span key={t} className='p-1 bg-slate-100 text-sm border text-light rounded-lg'>{t}</span>)}</div>
        </section>
        <section className="my-4">
          <h2 className="text-xl my-4">Transactions</h2>
          <div className="flex flex-nowrap flex-row justify-between items-baseline">
            <AddTransactionButton addressId={address.id} />
            <TransactionsSummary addressId={address.id} />
          </div>
          <TransactionsTable providedTransactions={addressTransactions} />
        </section>
      </>
      ) : null;
 
}
