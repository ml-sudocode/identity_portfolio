import React, { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWallets } from '../../state/wallets';
import AddWalletButton from './AddWalletButton';
import { WalletsTable } from './WalletsTable';
import { WalletSummary } from './WalletSummary';

export const WalletsIndex = () => {
  const wallets = useWallets();

  return (
    <>
      <h1 className='text-2xl'>Wallets</h1>
      {
        wallets.length > 0 ?
          (
            <>
              <div className="flex flex-nowrap flex-row justify-between items-baseline">
                <AddWalletButton />
                <WalletSummary />
              </div>
              <WalletsTable />
            </>
          ) :
          (
            <AddWalletButton />
          )
      }
    </>
  );
}
