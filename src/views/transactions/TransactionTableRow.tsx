import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "../../components/ExternalLink";
import { etherscanTx, presentBalance, presentEthAddress, truncate } from "../../lib/utils";
import { Transaction } from "../../state/transactions";

export const TransactionTableRow = ({ transaction }: { transaction: Transaction }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/transactions/show/${transaction.id}`)
  }

  const presentedDate = useMemo(() => {
    return `${formatDistanceToNow(new Date(transaction.date))} ago`;
  }, []);

  return <tr className="h-16 hover:bg-gray-100 hover:cursor-pointer border-y border-slate-200" onClick={onClick}>
    <td title={transaction?.txHash}><ExternalLink href={etherscanTx(transaction.txHash)}>🔗&nbsp;<code>{presentEthAddress(transaction.txHash)}</code></ExternalLink></td>
    <td>{presentedDate}</td>
    <td><span className='p-1 bg-slate-100 text-sm border text-light rounded-lg'>{transaction.type}</span></td>
    <td title={`${transaction.amount} ETH`}>{presentBalance(transaction.amount)} ETH</td>
    <td>{truncate(transaction.note, 40)}</td>
  </tr>
}
