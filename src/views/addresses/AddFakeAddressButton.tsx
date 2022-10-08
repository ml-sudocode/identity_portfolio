import { v4 as uuidv4 } from 'uuid';
import { useAddressesState } from "../../state/addresses";
import { Wallet as EthWallet } from 'ethers';
import { faker } from '@faker-js/faker';
import { randomIntInRange } from '../../lib/utils';

export default function AddFakeAddressButton()  {
  const onClick = () => {
    useAddressesState.getState().add({
      id: uuidv4(),
      value: EthWallet.createRandom().address,
      label: faker.name.firstName(),
      tags: Array.from({ length: randomIntInRange(0, 5) }).map(() => faker.word.adjective()),
      balance: Math.random() > 0.5 ? Math.random() : 0,
    });  
  }

  return <div className="my-4">
    <button className='border border-gray p-2' onClick={onClick}>🔧 Add Fake Address</button>
  </div>
}
