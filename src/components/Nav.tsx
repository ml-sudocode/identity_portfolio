import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from "@/assets/wallet.svg";

export default function Nav() {

  return (
    <nav className="flex sm:justify-center items-center space-x-4 py-2">
      <Link to={'/'}>
        <div className='flex flex-nowrap flex-row justify-center align-center space-x-2'>
          <span className='h-8 w-8'>
            <Logo />
          </span>  
          <span className='leading-loose align-middle'><code>basic-mich</code></span>
        </div>
      </Link>
      {[
        ['identities', '/identities'],
        ['addresses', '/addresses'],
        ['about', '/about'],
      ].map(([title, url]) => (
        <NavLink to={url} key={title} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</NavLink>
      ))}
    </nav>
  )
}
