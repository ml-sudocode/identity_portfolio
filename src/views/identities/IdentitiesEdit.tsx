import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom"
import { useIdentities, useIdentityFromSlug } from '../../state/identities';
import IdentitiesForm from './IdentitiesForm';

export const IdentitiesEdit = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{slug: string}>();
  const identities = useIdentities();
  const editingIdentity = useMemo(() => {
    if(!identities) { return };

    return identities.find(i => i.slug === slug); // TODO: use string / uuid
  }, [identities, slug]);

  if(!editingIdentity) {
    navigate('/identities');
  }

  return (<>
    <h1 className='text-2xl'><Link to={'/identities'} className='text-gray-500'>Identities /</Link> {editingIdentity?.label}</h1>
    <IdentitiesForm identity={editingIdentity} />
  </>)
}
