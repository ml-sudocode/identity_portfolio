import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AddWalletButton() {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate('/wallets/new');
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="add wallet" onClick={onClick}>👤 Add Wallet</button>
  </div>
}
