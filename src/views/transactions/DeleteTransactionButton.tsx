import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactionsState } from "../../state/transactions";

export default function DeleteTransactionButton({ id }: { id: string }) {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    useTransactionsState.getState().del(id);
    navigate(`/transactions`);
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="delete address" onClick={onClick}>💣 Delete Transaction</button>
</div>
}
