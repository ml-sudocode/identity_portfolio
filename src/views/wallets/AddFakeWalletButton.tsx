import { v4 as uuidv4 } from 'uuid';
import { useWalletsState } from "../../state/wallets";
import { Wallet as EthWallet } from 'ethers';
import { faker } from '@faker-js/faker';
import { randomIntInRange } from '../../lib/utils';

export default function AddFakeWalletButton()  {
  const onClick = () => {
    useWalletsState.getState().add({
      id: uuidv4(),
      ethWallet: EthWallet.createRandom(),
      keystore: null,
      label: faker.name.firstName(),
      tags: Array.from({ length: randomIntInRange(0, 5) }).map(() => faker.word.adjective()),
      balance: Math.random() > 0.5 ? Math.random() : 0,
    });  
  }

  return <div className="my-4">
    <button className='border border-gray p-2' onClick={onClick}>🔧 Add Fake Wallet</button>
  </div>
}
