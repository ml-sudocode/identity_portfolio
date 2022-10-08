import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { useIdentitiesState } from '../../state/identities';
import slugify from 'slugify';
import { randomIntInRange } from '../../lib/utils';

export default function AddFakeIdentityButton()  {
  const onClick = () => {
    const name = faker.name.fullName();
    useIdentitiesState.getState().add({
      id: uuidv4(),
      label: name,
      slug: slugify(name),
      tags: Array.from({ length: randomIntInRange(0, 5) }).map(() => faker.word.adjective()),
    });  
  }

  return <div className="my-4">
    <button className='border border-gray p-2' onClick={onClick}>🔧 Add Fake Identity</button>
  </div>
}
