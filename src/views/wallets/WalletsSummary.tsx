import React from 'react';
import { pluralize, presentBalance } from '../../lib/utils';
import { useAddresses } from '../../state/addresses';
import { useWallets } from '../../state/wallets';

export const WalletsSummary = () => {
  const wallets = useWallets();
  const addresses = useAddresses();

  return <div>
    {addresses.length} {pluralize('address', addresses.length, 'addresse')} across {wallets.length} {pluralize('wallet', wallets.length)}
  </div>
}
