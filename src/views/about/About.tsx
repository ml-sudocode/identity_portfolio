import { ExternalLink } from '../../components/ExternalLink';

export const About = () => {
  return (
    <div>
      <h1 className='text-2xl'>About</h1>
      <p className='my-4'><span className='font-medium'>DID</span>: Decentralized Wallet Dossier</p>
      <p className='my-4'>Create one or more Wallets, then assign some wallets to each to track your web3 activity</p>
      <p className='my-4'>A collaboration by <ExternalLink href='https://twitter.com/michlai007'>@michlai007</ExternalLink> and <ExternalLink href='https://twitter.com/tholford0'>@tholford0</ExternalLink></p>
    </div>
  )
}
