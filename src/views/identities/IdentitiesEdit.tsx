import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom"
import { useIdentityFromSlug } from '../../state/identities';

export const IdentitiesEdit = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{slug: string}>();
  
  const identity = useIdentityFromSlug(slug);
  const onSave = () => {
    console.log('saving ...');
    navigate(`/identities/show/${slug}`);
  }
  const onCancel = () => {
    navigate(`/identities/show/${slug}`);
  }
  return <>
    <h1 className='text-2xl'><Link to={'/identities'} className='text-gray-500'>Identities /</Link> Edit</h1>
    <button className='button' onClick={onSave}>💾 Save</button>
    <button className='button' onClick={onCancel}>❌ Cancel</button>
  </>
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
