import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTransactionButton({ addressId }: { addressId?: string }) {
  const navigate = useNavigate();
  const handleAddClick = useCallback(() => {
    navigate(addressId ? `/transactions/new?addressId=${addressId}` : '/transactions/new');
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="add transaction" onClick={handleAddClick}>📒 Add Transaction</button>
  </div>
}
