import React from 'react';
import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useWallet } from '../../state/wallets';
import DeleteWalletButton from './DeleteWalletButton';
import EditWalletButton from './EditWalletButton';
// import { useWallets } from "../../state/wallets";
// import WalletsForm from "./WalletsForm";

export const WalletsDetail = () => {
  const { id } = useParams<{id: string}>();
  const wallet = useWallet(id);
  const navigate = useNavigate();
  if(!wallet) { navigate('/') }

  return wallet ? 
      (
        <>
        <h1 className='text-2xl'><Link to={'/wallets'} className='text-gray-500'>Wallets /</Link> {wallet?.label}</h1>
        <div className="buttons-container">
          <EditWalletButton id={wallet.id} />
          <DeleteWalletButton id={wallet.id} />
        </div>
      </>
      ) : null;
  
  //   const navigate = useNavigate();
//   const wallets = useWallets();
//   const editingWallet = useMemo(() => {
//     if(!wallets) { return };

//     return wallets.find(t => t.id === id); // TODO: use string / uuid
//   }, [wallets, id]);

//   useEffect(() => {
//     if(!editingWallet) {
//       navigate('/wallets');
//     }
//   }, [editingWallet, navigate]);

//   return (<>
//     <h2><span className="subdued">Wallets</span> / Edit</h2>
//     <WalletsForm wallet={editingWallet} />
//   </>)
}
