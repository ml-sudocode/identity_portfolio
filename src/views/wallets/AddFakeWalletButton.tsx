import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { useWalletsState } from '../../state/wallets';
import slugify from 'slugify';
import { randomIntInRange } from '../../lib/utils';

export default function AddFakeWalletButton()  {
  const onClick = () => {
    const name = faker.name.fullName();
    useWalletsState.getState().add({
      id: uuidv4(),
      label: name,
      description: faker.commerce.productDescription(),
      slug: slugify(name),
    });  
  }

  return <div className="my-4">
    <button className='border border-gray p-2' onClick={onClick}>🔧 Add Fake Wallet</button>
  </div>
}
