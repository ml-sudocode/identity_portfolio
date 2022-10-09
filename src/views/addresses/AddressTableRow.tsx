import { useNavigate } from "react-router-dom";
import { AccountIcon } from "../../components/AccountIcon";
import { presentBalance, presentEthAddress } from "../../lib/utils";
import { Address, useAddressBalance } from "../../state/addresses";

export const AddressTableRow = ({ address }: { address: Address }) => {
  const navigate = useNavigate();
  const { addressBalance } = useAddressBalance();
  const balance = addressBalance(address.id);

  const onClick = () => {
    navigate(`/addresses/show/${address.id}`)
  }

  return <tr className="h-16 hover:bg-gray-100 hover:cursor-pointer border-y border-slate-200" onClick={onClick}>
    <td><AccountIcon account={address?.address} /></td>
    <td className="text-center"><span className="font-medium">{address.label}</span></td>
    <td className="text-center" title={address?.address ? address.address : 'locked'}>{address?.address ? <span className="font-mono">{presentEthAddress(address.address)}</span> : 'Locked'}</td>
    <td className="text-center" title={`${balance} ETH`}>{presentBalance(balance)} ETH</td>
    <td className="space-x-2 text-center" title='purpose'>{address.purpose.map(t => <span key={t} className='p-1 bg-slate-100 text-sm border text-light rounded-lg'>{t}</span>)}</td>
  </tr>
}
