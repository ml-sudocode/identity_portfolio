import React from 'react';
import { AddressTableRow } from "./AddressTableRow";
import { useAddresses, useAddressesForWallet } from '../../state/addresses';

export const AddressesTable = ({ walletId }: { walletId?: string }) => {
  const addresses = useAddresses();
  const walletAddresses = useAddressesForWallet(walletId);
  const a = walletId ? walletAddresses : addresses;

  return (<>
    <div className='w-full'>
      <table className="w-full table-auto border-y border-slate-300 border-collapse">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Address</th>
            <th>Balance</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {a.map(w => <AddressTableRow address={w} key={w.id} />)}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </>);
};
