import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useIdentitiesState } from "../../state/identities";

export default function DeleteIdentityButton({ id }: { id: string }) {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    useIdentitiesState.getState().del(id);
    navigate(`/identities`);
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="delete identity" onClick={onClick}>💣 Delete Identity</button>
</div>
}
