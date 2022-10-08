import React, { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid';
// @ts-expect-error WalletConnect hack
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'
import { Wallet as EthWallet } from 'ethers';
import { useEtherBalance, useEthers } from '@usedapp/core'
import { AccountIcon } from '@/components/AccountIcon'
import { ReactComponent as WalletConnectIcon } from '@/assets/walletconnect.svg';
import { presentEthAddress } from '../../lib/utils'
import { useWalletsState } from '../../state/wallets'


export default function AddWalletConnectButton() {
  const { account, activate, deactivate } = useEthers()
  const etherBalance = useEtherBalance(account)

  async function onConnect() {
    try {
      const provider = new WalletConnectProvider({
        infuraId: import.meta.env.VITE_INFURA_KEY,
      })
      await provider.enable()
      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }

  const addWallet = useCallback(() => {
    if(account) {
      useWalletsState.getState().add({
        id: uuidv4(),
        ethWallet: null,
        label: '',
        tags: [],
        balance: etherBalance?.toNumber() ?? 0,
        keystore: null
      });
    }
  }, []);

  const ConnectButton = () => (
    <div className="my-4">
      <button className='border border-gray p-2' onClick={onConnect}><div className='transform scale-50'><WalletConnectIcon /></div> Connect</button>
    </div>
  )

  const WalletConnectConnect = () => (
    <div>
      {account && (
        <div className='flex flex-nowrap flex-row space-x-2'>
          <AccountIcon account={account} />
          <div className='font-mono'>{presentEthAddress(account)}</div>
        </div>
      )}
      {!account ? <ConnectButton /> : null}

      { account ? <div className='space-x-4 my-4'>
          <button className="border border-slate-300 rounded-md pylc-2 px-4" title="add wallet" onClick={addWallet}>💰 Add Wallet</button>
          <button className="border border-red-300 rounded-md pylc-2 px-4" onClick={deactivate}>📴 Disconnect</button>
      </div> : null}
    </div>
  )

  return <WalletConnectConnect />
}