import { useNavigate } from "react-router-dom";
import { AccountIcon } from "../../components/AccountIcon";
import { presentBalance, presentEthAddress } from "../../lib/utils";
import { Address } from "../../state/addresses";

export const AddressTableRow = ({ address }: { address: Address }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/addresses/show/${address.id}`)
  }

  return <tr className="h-16 hover:bg-gray-100 hover:cursor-pointer border-y border-slate-200" onClick={onClick}>
    <td><AccountIcon account={address?.value} /></td>
    <td><span className="font-medium">{address.label}</span></td>
    <td title={address?.value ? address.value : 'locked'}>{address?.value ? <span className="font-mono">{presentEthAddress(address.value)}</span> : 'Locked'}</td>
    <td title={`${address.balance} ETH`}>{presentBalance(address.balance)} ETH</td>
    <td className="space-x-2" title='tags'>{address.tags.map(t => <span key={t} className='p-1 bg-slate-100 text-sm border text-light rounded-lg'>{t}</span>)}</td>
  </tr>
}
