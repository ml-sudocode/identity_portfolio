import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom"
import { useWallets, useWalletFromSlug } from '../../state/wallets';
import WalletsForm from './WalletsForm';

export const WalletsEdit = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{slug: string}>();
  const wallets = useWallets();
  const editingWallet = useMemo(() => {
    if(!wallets) { return };

    return wallets.find(i => i.slug === slug); // TODO: use string / uuid
  }, [wallets, slug]);

  if(!editingWallet) {
    navigate('/wallets');
  }

  return (<>
    <h1 className='text-2xl'><Link to={'/wallets'} className='text-gray-500'>Wallets /</Link> {editingWallet?.label}</h1>
    <WalletsForm wallet={editingWallet} />
  </>)
}
