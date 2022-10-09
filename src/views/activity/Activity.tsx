import React from 'react';
import { Route, Routes } from "react-router-dom"
import ActivityIndex from './ActivityIndex';

export const Activity = () => {
  return (<>
    <Routes>
      <Route path="/" element={<ActivityIndex />} />
    </Routes>
  </>)
}
