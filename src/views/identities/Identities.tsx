import React from 'react';
import { Route, Routes } from "react-router-dom"
import IdentitiesDetail from './IdentitiesDetail';
import { IdentitiesEdit } from './IdentitiesEdit';
import IdentitiesIndex from './IdentitiesIndex';
import IdentitiesNew from './IdentitiesNew';

export const Identities = () => {
  return (<>
    <Routes>
      <Route path="/" element={<IdentitiesIndex />} />
      <Route path="/new" element={<IdentitiesNew />} />
      <Route path="/show/:slug" element={<IdentitiesDetail />} />
      <Route path="/edit/:slug" element={<IdentitiesEdit />} />
    </Routes>
  </>)
}
