import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useWalletsState } from "../../state/wallets";

export default function DeleteWalletButton({ id }: { id: string }) {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    useWalletsState.getState().del(id);
    navigate(`/wallets`);
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="delete wallet" onClick={onClick}>💣 Delete Wallet</button>
</div>
}
