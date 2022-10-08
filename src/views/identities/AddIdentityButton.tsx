import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AddIdentityButton() {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate('/identities/new');
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="add wallet" onClick={onClick}>👤 Add Identity</button>
  </div>
}
