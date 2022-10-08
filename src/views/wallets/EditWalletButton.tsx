import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function EditWalletButton({ id }: { id: string }) {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/wallets/edit/${id}`);
  }, [navigate]);

  return <div className="my-4">
    <button className="border border-slate-300 rounded-md py-2 px-4" title="edit wallet" onClick={onClick}>✏️ Edit Wallet</button>
</div>
}
