import React from 'react';
import { IdentitiesTableRow } from "./IdentitiesTableRow";
import { useIdentities } from '../../state/identities';

export const IdentitiesTable = () => {
  const identities = useIdentities();

  return (<>
    <div className='w-full'>
      <table className="w-full table-auto border-y border-slate-300 border-collapse">
        <tbody>
          {identities.map(i => <IdentitiesTableRow identity={i} key={i.id} />)}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </>);
};
