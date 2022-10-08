import React from 'react';
import { pluralize, presentBalance } from '../../lib/utils';
import { useIdentities } from '../../state/identities';

export const IdentitiesSummary = () => {
  const identities = useIdentities();

  return <div>
    {identities.length} {pluralize('identity', identities.length, 'identitie')}
  </div>
}
