import React from 'react';
import { pluralize, presentBalance } from '../../lib/utils';
import { useAddressBalance, useAddresses, useAddressesForWallet } from '../../state/addresses';
import { useTransactions } from '../../state/transactions';

export const AddressSummary = ({ walletId }: { walletId?: string }) => {
  const addresses = useAddresses();
  const walletAddresses = useAddressesForWallet(walletId);
  const transactions = useTransactions();
  const { addressBalance } = useAddressBalance();
  const a = walletId ? walletAddresses : addresses;

  const addressTransactions = (addressId: string) => {
    return transactions.filter(t => t.addressId === addressId)
  }

  const total = a.reduce((memo, addr) => {
    return memo + addressBalance(addr.id)
  }, 0);

  return <div>
    {presentBalance(total)} ETH across {a.length} {pluralize('address', a.length)}
  </div>
}
