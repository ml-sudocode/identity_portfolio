import React from 'react';
import { Link } from 'react-router-dom';
import { isDevelopment } from '../../lib/flags';
import AddFakeAddressButton from "./AddFakeAddressButton"
import AddressesForm from './AddressesForm';

export const AddressesNew = () => {
  return (<>
    <h1 className='text-2xl'><Link to={'/addresses'} className='text-gray-500'>Addresses /</Link> Add</h1>
    { isDevelopment ? <AddFakeAddressButton /> : null }
    <AddressesForm />
  </>)
}
