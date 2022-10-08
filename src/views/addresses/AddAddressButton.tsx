import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAddressButton() {
  const navigate = useNavigate();
  const handleAddClick = useCallback(() => {
    navigate('/addresses/new');
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="add address" onClick={handleAddClick}>💰 Add Address</button>
  </div>
}
