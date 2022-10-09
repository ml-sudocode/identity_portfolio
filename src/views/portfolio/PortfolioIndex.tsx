import React, { useEffect, useMemo, useState } from "react";
import Fuse from 'fuse.js'
import { useWallets } from "../../state/wallets";
import PortfolioWallet from "./PortfolioWallet";
import useFuzzyWallets from "../../lib/useFuzzyWallets";
import AddWalletButton from "../wallets/AddWalletButton";
import { WalletsTable } from "../wallets/WalletsTable";
import { WalletsSummary } from "../wallets/WalletsSummary";

export default function PortfolioIndex() {
  const wallets = useWallets();
  const [query, setQuery] = useState<string>('');
  const { search } = useFuzzyWallets();

  const filteredWallets = useMemo(() => {
    if(query === '') return wallets.map(w => ({ item: w }));

    return search(query);
  }, [query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  useEffect(() => {
    console.log('query', query);
  }, [query]);

  useEffect(() => {
    console.log('filtered', filteredWallets); 
  }, [filteredWallets]);

  return <>
    <h1 className='text-2xl'>What I Have</h1>
    <section>
      <input type="text" className="input my-4 w-64" onChange={onChange} placeholder='Search for a wallet or address' />
    </section>
    {
      wallets.length > 0 ?
        (
          <>
            <div className="flex flex-nowrap flex-row justify-between items-baseline">
              <AddWalletButton />
              <WalletsSummary />
            </div>
            <WalletsTable providedWallets={filteredWallets.map(f => f.item)} />
          </>
        ) :
        (
          <AddWalletButton />
        )
    }
  </>
}
