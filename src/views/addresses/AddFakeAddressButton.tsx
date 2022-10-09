import { v4 as uuidv4 } from 'uuid';
import { useAddressesState } from "../../state/addresses";
import { Wallet as EthWallet } from 'ethers';
import { faker } from '@faker-js/faker';
import { randomElement, randomIntInRange } from '../../lib/utils';
import { defaultPurposeOptions } from './AddressesForm';
import { useWallets } from '../../state/wallets';
import AddFakeWalletButton from '../wallets/AddFakeWalletButton';

export default function AddFakeAddressButton() {
  const wallets = useWallets();

  const onClick = () => {
    useAddressesState.getState().add({
      id: uuidv4(),
      address: EthWallet.createRandom().address,
      description: faker.commerce.productDescription(),
      label: faker.name.firstName(),
      purpose: Array.from({ length: randomIntInRange(0, 5) }).map(() => randomElement(defaultPurposeOptions).value),
      walletId: randomElement(wallets).id,
    });  
  }

  return wallets.length === 0 ? (
    <AddFakeWalletButton />
  ) : (
    <div className="my-4">
      <button className='border border-gray p-2' onClick={onClick}>🔧 Add Fake Address</button>
    </div>
  )
}
