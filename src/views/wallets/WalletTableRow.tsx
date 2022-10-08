import { useNavigate } from "react-router-dom";
import { AccountIcon } from "../../components/AccountIcon";
import { presentBalance, presentEthAddress } from "../../lib/utils";
import { Wallet } from "../../state/wallets";

export const WalletTableRow = ({ wallet }: { wallet: Wallet }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/wallets/show/${wallet.id}`)
  }

  return <tr className="h-16 hover:bg-gray-100 hover:cursor-pointer border-y border-slate-200" onClick={onClick}>
    <td><AccountIcon account={wallet?.ethWallet?.address} /></td>
    <td><span className="font-medium">{wallet.label}</span></td>
    <td title={wallet?.ethWallet ? wallet.ethWallet.address : 'locked'}>{wallet?.ethWallet ? <span className="font-mono">{presentEthAddress(wallet.ethWallet.address)}</span> : 'Locked'}</td>
    <td title={`${wallet.balance} ETH`}>{presentBalance(wallet.balance)} ETH</td>
    <td className="space-x-2" title='tags'>{wallet.tags.map(t => <span key={t} className='p-1 bg-slate-100 text-sm border text-light rounded-lg'>{t}</span>)}</td>
  </tr>
}
