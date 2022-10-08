import { id } from "ethers/lib/utils";
import { useNavigate } from "react-router-dom";
import { truncate } from "../../lib/utils";
import { Wallet } from "../../state/wallets";

export const WalletsTableRow = ({ wallet }: { wallet: Wallet }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/wallets/show/${wallet.slug}`)
  }

  return <tr className="h-16 hover:bg-gray-100 hover:cursor-pointer border-y border-slate-200" onClick={onClick}>
    <td>{wallet.label}</td>
    <td>{truncate(wallet.description, 60)}</td>
  </tr>
}
