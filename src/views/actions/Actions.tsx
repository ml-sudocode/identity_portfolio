import React from 'react';
import { Route, Routes } from "react-router-dom"
import ActionsIndex from './ActionsIndex';

export const Actions = () => {
  return (<>
    <Routes>
      <Route path="/" element={<ActionsIndex />} />
    </Routes>
  </>)
}
