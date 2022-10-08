import React from 'react';
import { pluralize, presentBalance } from '../../lib/utils';
import { useAddresses } from '../../state/addresses';

export const AddressSummary = () => {
  const addresses = useAddresses();
  const total = addresses.reduce((memo, w) => memo + w.balance, 0);

  return <div>
    {presentBalance(total)} ETH across {addresses.length} {pluralize('address', addresses.length)}
  </div>
}
