import { ExternalLink } from '../../components/ExternalLink';

export const About = () => {
  return (
    <div>
      <h1 className='text-2xl'>About</h1>
      <p className='my-4'>A collaboration by <ExternalLink href='https://twitter.com/michlai007'>@michlai007</ExternalLink> and <ExternalLink href='https://twitter.com/tholford0'>@tholford0</ExternalLink></p>
    </div>
  )
}
