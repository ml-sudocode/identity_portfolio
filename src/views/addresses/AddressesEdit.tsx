import React from 'react';
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"
// import { useAddresses } from "../../state/addresses";
// import AddressesForm from "./AddressesForm";

export const AddressesEdit = () => {
  return <p>TODO: AddressesEdit</p>;
  //   const navigate = useNavigate();
//   const addresses = useAddresses();
//   const { id } = useParams<{id: string}>();
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
