import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivacySweepButton() {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    console.log('TODO');
  }, [navigate]);

  return <div className="my-4">
    <button className="button" title="add contact" onClick={onClick}>🔒 Privacy Sweep</button>
  </div>
}
