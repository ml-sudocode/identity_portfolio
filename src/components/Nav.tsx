import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from "@/assets/people.svg";

export default function Nav() {

  return (
    <nav className="flex sm:justify-center items-center space-x-4 py-2">
      <Link to={'/'}>
        <div className='flex flex-nowrap flex-row justify-center align-center space-x-2'>
          <div className='h-10 w-10 flex flex-col flex-nowrap justify-enter items-center'>
            <Logo />
          </div>
          <div className="flex flex-col flex-nowrap">
            <span className='text-sm'><code>avengers</code></span>
            <span className='text-sm'><code>pocketdb</code></span>
          </div>
        </div>
      </Link>
      {[
        // ['wallets', '/wallets'],
        // ['addresses', '/addresses'],
        // ['portfolio', '/portfolio'],
        // ['activity', '/activity'],
        // ['actions', '/actions'],
        // ['about', '/about'],
      ].map(([title, url]) => (
        <NavLink to={url} key={title} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</NavLink>
      ))}
    </nav>
  )
}
