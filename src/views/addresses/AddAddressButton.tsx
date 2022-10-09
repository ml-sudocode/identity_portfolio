import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAddressButton({ walletId }: { walletId?: string }) {
  const navigate = useNavigate();
  const handleAddClick = useCallback(() => {
    navigate(walletId ? `/addresses/new?walletId=${walletId}` : '/addresses/new');
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="add address" onClick={handleAddClick}>💰 Add Address</button>
  </div>
}
