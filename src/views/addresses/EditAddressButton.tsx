import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function EditAddressButton({ id }: { id: string }) {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/addresses/edit/${id}`);
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="edit address" onClick={onClick}>✏️ Edit Address</button>
</div>
}
