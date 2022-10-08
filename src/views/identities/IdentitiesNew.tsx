import React from 'react';
import { Link } from 'react-router-dom';
import { isDevelopment } from '../../lib/flags';
import AddFakeIdentityButton from './AddFakeIdentityButton';

export default function IdentitiesNew() {
  return (<>
    <h1 className='text-2xl'><Link to={'/identities'} className='text-gray-500'>Identities /</Link> Add</h1>
    { isDevelopment ? <AddFakeIdentityButton /> : null }

    {/* <AddWalletConnectButton /> */}
    {/* TODO: WalletConnect or Manual */}
    {/* <WalletsForm /> */}
  </>)
}
