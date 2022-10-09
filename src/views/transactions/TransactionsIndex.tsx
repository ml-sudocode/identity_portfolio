import { Link } from "react-router-dom";
import { useTransactions } from "../../state/transactions"
import AddTransactionButton from "./AddTransactionButton";
import { TransactionsSummary } from "./TransactionsSummary";
import { TransactionsTable } from "./TransactionsTable";

export default function TransactionsIndex() {
  const transactions = useTransactions();

  return (
    <>
      <h1 className='text-2xl'>Transactions</h1>
      {
        transactions.length > 0 ?
          (
            <>
              <div className="flex flex-nowrap flex-row justify-between items-baseline">
                <AddTransactionButton />
                <TransactionsSummary />
              </div>
              <TransactionsTable />
            </>
          ) :
          (
            <AddTransactionButton />
          )
      }
    </>
  );
}
