import React from 'react';
import { Link } from 'react-router-dom';
import { isDevelopment } from '../../lib/flags';
import AddFakeWalletButton from './AddFakeWalletButton';
import WalletsForm from './WalletsForm';

export default function WalletsNew() {
  return (<>
    <h1 className='text-2xl'><Link to={'/wallets'} className='text-gray-500'>Wallets /</Link> Add</h1>
    { isDevelopment ? <AddFakeWalletButton /> : null }
    <WalletsForm />
  </>)
}
