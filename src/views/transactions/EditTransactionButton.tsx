import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function EditTransactionButton({ id }: { id: string }) {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/transactions/edit/${id}`);
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="edit transaction" onClick={onClick}>✏️ Edit Transaction</button>
</div>
}
