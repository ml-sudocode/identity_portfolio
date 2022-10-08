import React from 'react';
import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAddress } from '../../state/addresses';
import DeleteAddressButton from './DeleteAddressButton';
import EditAddressButton from './EditAddressButton';
// import { useAddresses } from "../../state/addresses";
// import AddressesForm from "./AddressesForm";

export const AddressesDetail = () => {
  const { id } = useParams<{id: string}>();
  const address = useAddress(id);
  const navigate = useNavigate();
  if(!address) { navigate('/') }

  return address ? 
      (
        <>
        <h1 className='text-2xl'><Link to={'/addresses'} className='text-gray-500'>Addresses /</Link> {address?.label}</h1>
        <div className="buttons-container">
          <EditAddressButton id={address.id} />
          <DeleteAddressButton id={address.id} />
        </div>
      </>
      ) : null;
  
  //   const navigate = useNavigate();
//   const addresses = useAddresses();
//   const editingAddress = useMemo(() => {
//     if(!addresses) { return };

//     return addresses.find(t => t.id === id); // TODO: use string / uuid
//   }, [addresses, id]);

//   useEffect(() => {
//     if(!editingAddress) {
//       navigate('/addresses');
//     }
//   }, [editingAddress, navigate]);

//   return (<>
//     <h2><span className="subdued">Addresses</span> / Edit</h2>
//     <AddressesForm address={editingAddress} />
//   </>)
}
