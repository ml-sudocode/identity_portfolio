import React, { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAddresses } from '../../state/addresses';
import AddAddressButton from './AddAddressButton';
import { AddressesTable } from './AddressesTable';
import { AddressSummary } from './AddressSummary';

export const AddressesIndex = () => {
  const addresses = useAddresses();

  return (
    <>
      <h1 className='text-2xl'>Addresses</h1>
      {
        addresses.length > 0 ?
          (
            <>
              <div className="flex flex-nowrap flex-row justify-between items-baseline">
                <AddAddressButton />
                <AddressSummary />
              </div>
              <AddressesTable />
            </>
          ) :
          (
            <AddAddressButton />
          )
      }
    </>
  );
}
