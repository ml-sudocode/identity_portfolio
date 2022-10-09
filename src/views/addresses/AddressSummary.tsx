import React from 'react';
import { pluralize, presentBalance } from '../../lib/utils';
import { useAddresses, useAddressesForWallet } from '../../state/addresses';

export const AddressSummary = ({ walletId }: { walletId?: string }) => {
  const addresses = useAddresses();
  const walletAddresses = useAddressesForWallet(walletId);
  const a = walletId ? walletAddresses : addresses;

  const total = a.reduce((memo, w) => memo + w.balance, 0);

  return <div>
    {presentBalance(total)} ETH across {a.length} {pluralize('address', a.length)}
  </div>
}
