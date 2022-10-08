import React from 'react';
import { WalletsTableRow } from "./WalletsTableRow";
import { useWallets } from '../../state/wallets';

export const WalletsTable = () => {
  const wallets = useWallets();

  return (<>
    <div className='w-full'>
      <table className="w-full table-auto border-y border-slate-300 border-collapse">
        <tbody>
          {wallets.map(i => <WalletsTableRow wallet={i} key={i.id} />)}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </>);
};
