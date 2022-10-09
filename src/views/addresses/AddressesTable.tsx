import React from 'react';
import { AddressTableRow } from "./AddressTableRow";
import { useAddresses } from '../../state/addresses';

export const AddressesTable = () => {
  const addresses = useAddresses();

  return (<>
    <div className='w-full'>
      <table className="w-full table-auto border-y border-slate-300 border-collapse">
        <tbody>
          {addresses.map(w => <AddressTableRow address={w} key={w.id} />)}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </>);
};
