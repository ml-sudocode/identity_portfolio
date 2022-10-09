import React from 'react';
import { WalletsTableRow } from "./WalletsTableRow";
import { useWallets, Wallet } from '../../state/wallets';

export const WalletsTable = ({ providedWallets }: { providedWallets?: Wallet[] }) => {
  const wallets = useWallets();
  const w = providedWallets ? providedWallets : wallets;

  return (<>
    <div className='w-full'>
      <table className="w-full table-auto border-y border-slate-300 border-collapse">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Balance</th>
            <th># of Addresses</th>
            <th>Browsers</th>
            <th>Devices</th>
          </tr>
        </thead>
        <tbody>
          {w.map(i => <WalletsTableRow wallet={i} key={i.id} />)}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </>);
};
