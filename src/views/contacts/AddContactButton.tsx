import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AddContactButton({ addressId }: { addressId?: string }) {
  const navigate = useNavigate();
  const handleAddClick = useCallback(() => {
    console.log('TODO');
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="add contact" onClick={handleAddClick}>📇 Add Contact</button>
  </div>
}
