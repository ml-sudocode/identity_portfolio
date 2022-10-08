import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function EditIdentityButton({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/identities/edit/${slug}`);
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="edit wallet" onClick={onClick}>✏️ Edit Identity</button>
</div>
}
