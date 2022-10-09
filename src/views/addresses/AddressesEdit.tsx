import React from 'react';
import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAddresses } from '../../state/addresses';
import AddressesForm from './AddressesForm';

export const AddressesEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const addresses = useAddresses();
  const editingAddress = useMemo(() => {
    if(!addresses) { return };

    return addresses.find(i => i.id === id); // TODO: use string / uuid
  }, [addresses, id]);

  if(!editingAddress) {
    navigate('/addresses');
  }

  return (<>
    <h1 className='text-2xl'><Link to={'/addresses'} className='text-gray-500'>Addresss /</Link> {editingAddress?.label}</h1>
    <AddressesForm address={editingAddress} />
  </>)
}
