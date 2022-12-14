import React from 'react';
import { Route, Routes } from "react-router-dom"
import WalletsDetail from './WalletsDetail';
import { WalletsEdit } from './WalletsEdit';
import WalletsIndex from './WalletsIndex';
import WalletsNew from './WalletsNew';

export const Wallets = () => {
  return (<>
    <Routes>
      <Route path="/" element={<WalletsIndex />} />
      <Route path="/new" element={<WalletsNew />} />
      <Route path="/show/:slug" element={<WalletsDetail />} />
      <Route path="/edit/:slug" element={<WalletsEdit />} />
    </Routes>
  </>)
}
