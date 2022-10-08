import { useWallets } from "../../state/wallets"
import AddWalletButton from "../wallets/AddWalletButton";

export default function HomeIndex() {
  const wallets = useWallets();
  return wallets.length === 0 ? (
    <>
      <h1 className='text-2xl'>Onboarding</h1>
      <p className="my-4">Please add your wallets, adding tags and notes you'll find helpful later on</p>
      <p className="my-4">We recommend setting up at least 3 wallets: public, private, and personal (shared with a few friends)</p>
      <AddWalletButton />
    </>
  ) : (
    <>
      <p>HomeIndex: {wallets.length}</p>
    </>
  )
}