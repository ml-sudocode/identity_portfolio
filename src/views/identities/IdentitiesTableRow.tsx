import { id } from "ethers/lib/utils";
import { useNavigate } from "react-router-dom";
import { truncate } from "../../lib/utils";
import { Identity } from "../../state/identities";

export const IdentitiesTableRow = ({ identity }: { identity: Identity }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/identities/show/${identity.slug}`)
  }

  return <tr className="h-16 hover:bg-gray-100 hover:cursor-pointer border-y border-slate-200" onClick={onClick}>
    <td>{identity.label}</td>
    <td>{truncate(identity.description, 60)}</td>
  </tr>
}
