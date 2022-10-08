import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAddressesState } from "../../state/addresses";

export default function DeleteAddressButton({ id }: { id: string }) {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    useAddressesState.getState().del(id);
    navigate(`/addresses`);
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="delete address" onClick={onClick}>💣 Delete Address</button>
</div>
}
