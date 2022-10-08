import React from 'react';
import { pluralize, presentBalance } from '../../lib/utils';
import { useWallets } from '../../state/wallets';

export const WalletsSummary = () => {
  const wallets = useWallets();

  return <div>
    {wallets.length} {pluralize('wallet', wallets.length, 'identitie')}
  </div>
}
