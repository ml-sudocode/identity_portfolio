import React from 'react';
import { Route, Routes } from "react-router-dom"
import { AddressesDetail } from './AddressesDetail';
import { AddressesEdit } from './AddressesEdit';
import { AddressesIndex } from "./AddressesIndex"
import { AddressesNew } from './AddressesNew';

export const Addresses = () => {
  return (<>
    <Routes>
      <Route path="/" element={<AddressesIndex />} />
      <Route path="/new" element={<AddressesNew />} />
      <Route path="/show/:id" element={<AddressesDetail />} />
      <Route path="/edit/:id" element={<AddressesEdit />} />
    </Routes>
  </>)
}
