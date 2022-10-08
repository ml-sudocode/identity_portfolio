import React from 'react';
import { WalletTableRow } from "./WalletTableRow";
import { useWallets } from '../../state/wallets';

export const WalletsTable = () => {
  const wallets = useWallets();

  return (<>
    <div className='w-full'>
      <table className="w-full table-auto border-y border-slate-300 border-collapse">
        {/* <thead>
          <tr>
            <th colSpan={2}>asset</th>
            <th>price</th>
            <th>balance</th>
            <th>value</th>
            <th>P / L</th>
            <th></th>
          </tr>
        </thead> */}
        <tbody>
          {wallets.map(w => <WalletTableRow wallet={w} key={w.id} />)}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </>);
};
