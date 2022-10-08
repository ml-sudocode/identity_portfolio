import React, { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid';
// @ts-expect-error AddressConnect hack
import AddressConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'
import { Address as EthAddress } from 'ethers';
import { useEtherBalance, useEthers } from '@usedapp/core'
import { AccountIcon } from '@/components/AccountIcon'
import { ReactComponent as AddressConnectIcon } from '@/assets/walletconnect.svg';
import { presentEthAddress } from '../../lib/utils'
import { useAddressesState } from '../../state/addresses'


export default function AddAddressConnectButton() {
  const { account, activate, deactivate } = useEthers()
  const etherBalance = useEtherBalance(account)

  async function onConnect() {
    try {
      const provider = new AddressConnectProvider({
        infuraId: import.meta.env.VITE_INFURA_KEY,
      })
      await provider.enable()
      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }

  const addAddress = useCallback(() => {
    if(account) {
      useAddressesState.getState().add({
        id: uuidv4(),
        value: null,
        label: '',
        tags: [],
        balance: etherBalance?.toNumber() ?? 0,
        keystore: null
      });
    }
  }, []);

  const ConnectButton = () => (
    <div className="my-4">
      <button className='border border-gray p-2' onClick={onConnect}><div className='transform scale-50'><AddressConnectIcon /></div> Connect</button>
    </div>
  )

  const AddressConnectConnect = () => (
    <div>
      {account && (
        <div className='flex flex-nowrap flex-row space-x-2'>
          <AccountIcon account={account} />
          <div className='font-mono'>{presentEthAddress(account)}</div>
        </div>
      )}
      {!account ? <ConnectButton /> : null}

      { account ? <div className='space-x-4 my-4'>
          <button className="border border-slate-300 rounded-md pylc-2 px-4" title="add address" onClick={addAddress}>💰 Add Address</button>
          <button className="border border-red-300 rounded-md pylc-2 px-4" onClick={deactivate}>📴 Disconnect</button>
      </div> : null}
    </div>
  )

  return <AddressConnectConnect />
}