import React, { useEffect, useMemo, useState } from "react";
import Fuse from 'fuse.js'
import Select, { MultiValue } from 'react-select';
import { useWallets, Wallet } from "../../state/wallets";
import useFuzzyWallets from "../../lib/useFuzzyWallets";
import AddWalletButton from "../wallets/AddWalletButton";
import { WalletsTable } from "../wallets/WalletsTable";
import { WalletsSummary } from "../wallets/WalletsSummary";
import { Link } from "react-router-dom";

export default function PortfolioIndex() {
  const wallets = useWallets();

  const [query, setQuery] = useState<string>('');
  const { search } = useFuzzyWallets();

  const browserFilterOptions = () => {
    const browserSet = new Set();
    wallets.forEach(w => w.browsers.forEach(b => browserSet.add(b)));

    return Array.from(browserSet).map(b => ({ label: b, value: b}));
  }

  const deviceFilterOptions = () => {
    const deviceSet = new Set();
    wallets.forEach(w => w.devices.forEach(b => deviceSet.add(b)));

    return Array.from(deviceSet).map(b => ({ label: b, value: b}));
  }

  const [selectedBrowsers, setSelectedBrowsers] = useState<string[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  const onBrowserFilterChange = (values: MultiValue<{ label: string, value: string}>, _actionMeta: any) => {
    setSelectedBrowsers(values.map(v => v.value))
  }

  const onDeviceFilterChange = (values: MultiValue<{ label: string, value: string}>, _actionMeta: any) => {
    setSelectedDevices(values.map(v => v.value))
  }

  const filteredWallets = useMemo(() => {
    const searchResults = (query === '') ? wallets.map(w => ({ item: w })) : search(query);

    const results = searchResults.filter(r=> {
      // browser
      return (selectedBrowsers.length === 0 ? true : r.item.browsers.some(b => selectedBrowsers.includes(b))) &&
      // devices
      (selectedDevices.length === 0 ? true : r.item.devices.some(d => selectedDevices.includes(d)))
    })

    return results;
  }, [selectedBrowsers, selectedDevices, query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return <>
    <h1 className='text-2xl'><Link to={'/home'} className='text-gray-500'>Home /</Link> What I Have</h1>
    <section className="flex flex-row flex-nowrap items-center space-x-2">
      <div className="flex-1">
        <Select
          isMulti
          options={browserFilterOptions()}
          // @ts-expect-error TODO
          onChange={onBrowserFilterChange}
          placeholder={'Filter by Browser'}
        />
      </div>
      <div className="flex-1">
        <Select
          isMulti
          options={deviceFilterOptions()}
          // @ts-expect-error TODO
          onChange={onDeviceFilterChange}
          placeholder={'Filter by Device'}
        />
      </div>
      <div className="flex-1">
        <input type="text" className="input my-4 w-64" onChange={onChange} placeholder='Search by name or description' />
      </div>
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
