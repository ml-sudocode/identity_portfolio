import { v4 as uuidv4 } from 'uuid';
import { useTransactionsState } from "../../state/transactions";
import { Wallet as EthWallet } from 'ethers';
import { faker } from '@faker-js/faker';
import { randomElement } from '../../lib/utils';
import { typeOptions } from './TransactionsForm';
import { useAddresses } from '../../state/addresses';
import AddFakeAddressButton from '../addresses/AddFakeAddressButton';

export default function AddFakeTransactionButton() {
  const addresses = useAddresses();

  const onClick = () => {
    useTransactionsState.getState().add({
      id: uuidv4(),
      txHash: EthWallet.createRandom().address,
      note: faker.commerce.productDescription(),
      type: randomElement(typeOptions).value,
      amount: Math.random() > 0.5 ? Math.random() : 0,
      addressId: randomElement(addresses).id,
      date: Date.now(),
    });  
  }

  return addresses.length === 0 ? (
    <AddFakeAddressButton />
  ) : (
    <div className="my-4">
      <button className='border border-gray p-2' onClick={onClick}>🔧 Add Fake Transaction</button>
    </div>
  )
}
