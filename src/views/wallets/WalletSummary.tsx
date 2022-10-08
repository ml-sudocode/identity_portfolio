import React from 'react';
import { pluralize, presentBalance } from '../../lib/utils';
import { useWallets } from '../../state/wallets';

export const WalletSummary = () => {
  const wallets = useWallets();
  const total = wallets.reduce((memo, w) => memo + w.balance, 0);

  return <div>
    {presentBalance(total)} ETH across {wallets.length} {pluralize('wallet', wallets.length)}
  </div>
}
