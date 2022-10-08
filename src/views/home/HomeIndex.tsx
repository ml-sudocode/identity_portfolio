import { useIdentities } from "../../state/identities"
import AddIdentityButton from "../identities/AddIdentityButton";

export default function HomeIndex() {
  const identities = useIdentities();
  return identities.length === 0 ? (
    <>
      <h1 className='text-2xl'>Onboarding</h1>
      <p className="my-4">Please add your accounts, adding tags and notes you'll find helpful later on</p>
      <p className="my-4">We recommend setting up at least 3 identities: public, private, and personal (shared with a few friends)</p>
      <AddIdentityButton />
    </>
  ) : (
    <>
      <p>HomeIndex: {identities.length}</p>
    </>
  )
}