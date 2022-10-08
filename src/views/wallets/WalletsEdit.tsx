import React from 'react';
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"
// import { useWallets } from "../../state/wallets";
// import WalletsForm from "./WalletsForm";

export const WalletsEdit = () => {
  return <p>TODO: WalletsEdit</p>;
  //   const navigate = useNavigate();
//   const wallets = useWallets();
//   const { id } = useParams<{id: string}>();
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
