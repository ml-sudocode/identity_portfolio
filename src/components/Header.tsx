import React from 'react';
import { Link } from "react-router-dom"

export const Header = () => {

  return (
    <div className='space-x-2 py-2'>
      <Link className="text-lg" to={'/'}>basic-mich</Link>
      <Link className="text-lg" to={'/about'}>about</Link>
    </div>
  )
}
