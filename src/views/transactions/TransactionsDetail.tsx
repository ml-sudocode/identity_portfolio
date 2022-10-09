import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom"
import { ExternalLink } from '../../components/ExternalLink';
import { etherscanTx, presentBalance, presentEthAddress } from '../../lib/utils';
import { useTransaction } from '../../state/transactions';
import { useAddress } from '../../state/addresses';
import DeleteTransactionButton from './DeleteTransactionButton';
import EditTransactionButton from './EditTransactionButton';

export const TransactionsDetail = () => {
  const { id } = useParams<{id: string}>();
  const transaction = useTransaction(id);
  const address = useAddress(transaction?.addressId);
  const navigate = useNavigate();
  if(!transaction) { navigate('/') }

  return transaction ? 
      (
        <>
        <h1 className='text-2xl'><Link to={'/transactions'} className='text-gray-500'>Transactions /</Link> <code>{presentEthAddress(transaction?.txHash)}</code></h1>
        <div className="buttons-container">
          <EditTransactionButton id={transaction.id} />
          <DeleteTransactionButton id={transaction.id} />
        </div>
        <section className="my-2">
          <h2 className="text-xl my-4">Transaction</h2>
          <p><ExternalLink href={etherscanTx(transaction.txHash)}>🔗&nbsp;<code>{transaction.txHash}</code></ExternalLink></p>
        </section>
        <section className="my-2">
          <h2 className="text-xl my-4">Address</h2>
          {
            address ? (
              <Link to={`/addresses/show/${address.id}`}>{address.label}</Link>
            ) : (
              <p>Not associated with a address</p>
            )
          }
        </section>
        <section className="my-2">
          <h2 className="text-xl my-4">Amount</h2>
          <p>{presentBalance(transaction.amount)} ETH</p>
        </section>
        <section className="my-2">
          <h2 className="text-xl my-4">Note</h2>
          <p>{transaction.note}</p>
        </section>
      </>
      ) : null;
 
}
