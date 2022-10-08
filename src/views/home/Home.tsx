import React from 'react';
import { Route, Routes } from "react-router-dom"
import HomeIndex from './HomeIndex';

export const Home = () => {
  return (<>
    <Routes>
      <Route path="/" element={<HomeIndex />} />
    </Routes>
  </>)
}
