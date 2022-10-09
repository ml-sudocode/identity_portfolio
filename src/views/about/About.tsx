import { ExternalLink } from '../../components/ExternalLink';

export const About = () => {
  return (
    <div>
      <h1 className='text-2xl'>About</h1>
      <p className='my-4'><span className='font-medium'>Identities</span></p>
      <p className='my-4'>Create one or more Wallets, then assign some addresses to each to track your web3 activity</p>
      <p className='my-4'>A collaboration by <ExternalLink className='bg-blue-100 p-1' href='https://twitter.com/michlai007'>@michlai007</ExternalLink> and <ExternalLink className='bg-blue-100 p-1' href='https://twitter.com/tholford0'>@tholford0</ExternalLink></p>
    </div>
  )
}
