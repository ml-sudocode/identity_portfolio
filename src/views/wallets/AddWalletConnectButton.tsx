import React from 'react'
// @ts-expect-error WalletConnect hack
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from 'ethers/lib/utils'
import { AccountIcon } from '@/components/AccountIcon'
import { ReactComponent as WalletConnectIcon } from '@/assets/walletconnect.svg';


export default function AddWalletConnectButton() {
  const { account, activate, deactivate, chainId } = useEthers()
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

  const ConnectButton = () => (
    <div className="my-4">
      <button className='border border-gray p-2' onClick={onConnect}><div className='transform scale-50'><WalletConnectIcon /></div> Connect</button>
    </div>
  )

  const WalletConnectConnect = () => (
    <div>
      {account && (
        <div>
          <div className="inline">
            <AccountIcon account={account} />
            &nbsp;
            <div className="account">{account}</div>
          </div>
          <br />
        </div>
      )}
      {!account && <ConnectButton />}
      {account && <button onClick={deactivate}>Disconnect</button>}
      <br />
    </div>
  )

  return (
    <div>
      <WalletConnectConnect />
      {etherBalance && (
        <div className="balance">
          <br />
          Balance:
          <p className="bold">{formatEther(etherBalance)} ETH</p>
        </div>
      )}
    </div>
  )
}