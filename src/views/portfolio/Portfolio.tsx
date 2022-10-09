import React from 'react';
import { Route, Routes } from "react-router-dom"
import PortfolioIndex from './PortfolioIndex';

export const Portfolio = () => {
  return (<>
    <Routes>
      <Route path="/" element={<PortfolioIndex />} />
    </Routes>
  </>)
}
