import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function EditWalletButton({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/wallets/edit/${slug}`);
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="edit wallet" onClick={onClick}>✏️ Edit Wallet</button>
</div>
}
