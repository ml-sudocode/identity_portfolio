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
    <td className='text-center'>{wallet.label}</td>
    <td className='text-center'>{truncate(wallet.description, 60)}</td>
    <td className='text-center'>{presentBalance(balance)} ETH</td>
    <td className='text-center'>{addresses.length} {pluralize('address', addresses.length, 'addresse')}</td>
    <td className='text-center space-x-2'>{wallet.browsers.map(t => <span key={t} className='p-1 bg-slate-100 text-sm border text-light rounded-lg'>{t}</span>)}</td>
    <td className='text-center space-x-2'>{wallet.devices.map(t => <span key={t} className='p-1 bg-slate-100 text-sm border text-light rounded-lg'>{t}</span>)}</td>
  </tr>
}
