import React, { useMemo, useState } from "react";
import { useTransactions } from "../../state/transactions";
import useFuzzyTransactions from "../../lib/useFuzzyTransactions";
import AddTransactionButton from "../transactions/AddTransactionButton";
import { TransactionsTable } from "../transactions/TransactionsTable";
import { TransactionsSummary } from "../transactions/TransactionsSummary";
import { Link } from "react-router-dom";

export default function ActivityIndex() {
  const transactions = useTransactions();
  const [query, setQuery] = useState<string>('');
  const { search } = useFuzzyTransactions();

  const filteredTransactions = useMemo(() => {
    if(query === '') return transactions.map(w => ({ item: w }));

    return search(query);
  }, [query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return <>
    <h1 className='text-2xl'><Link to={'/home'} className='text-gray-500'>Home /</Link> What I Did</h1>
    <section>
      <input type="text" className="input my-4 w-64" onChange={onChange} placeholder='Search for a wallet or address' />
    </section>
    {
      transactions.length > 0 ?
        (
          <>
            <div className="flex flex-nowrap flex-row justify-between items-baseline">
              <AddTransactionButton />
              <TransactionsSummary />
            </div>
            <TransactionsTable providedTransactions={filteredTransactions.map(f => f.item)} />
          </>
        ) :
        (
          <AddTransactionButton />
        )
    }
  </>;
}
