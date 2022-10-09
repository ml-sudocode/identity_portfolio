import { id } from "ethers/lib/utils";
import { useNavigate } from "react-router-dom";
import { pluralize, presentBalance, truncate } from "../../lib/utils";
import { useAddressBalance, useAddressesForWallet } from "../../state/addresses";
import { Wallet } from "../../state/wallets";

export const WalletsTableRow = ({ wallet }: { wallet: Wallet }) => {
  const navigate = useNavigate();
  const addresses = useAddressesForWallet(wallet?.id);
  const { addressBalance } = useAddressBalance();
  const balance = addresses.reduce((memo, a) => memo + addressBalance(a.id), 0)
  
  const onClick = () => {
    navigate(`/wallets/show/${wallet.slug}`)
  }

  return <tr className="h-16 hover:bg-gray-100 hover:cursor-pointer border-y border-slate-200" onClick={onClick}>
    <td>{wallet.label}</td>
    <td>{truncate(wallet.description, 60)}</td>
    <td>{presentBalance(balance)} ETH</td>
    <td>{addresses.length} {pluralize('address', addresses.length, 'addresse')}</td>
  </tr>
}
