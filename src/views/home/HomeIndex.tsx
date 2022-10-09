import { Link } from "react-router-dom";
import { useWallets } from "../../state/wallets"
import AddWalletButton from "../wallets/AddWalletButton";

export default function HomeIndex() {
  const wallets = useWallets();
  return wallets.length === 0 ? (
    <>
      <h1 className='text-2xl'>Onboarding</h1>
      <p className="my-4">Please add your wallets, adding purpose and notes you'll find helpful later on</p>
      <p className="my-4">We recommend setting up at least 3 wallets: public, private, and personal (shared with a few friends)</p>
      <AddWalletButton />
    </>
  ) : (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="flex flex-row flex-nowrap space-x-8 justify-center my-4">
        <Link to={'/'} className="bg-medellin bg-right w-64 h-64 border border-slate-600 rounded-lg flex flex-col flex-nowrap justify-center items-center hover:opacity-90">
          <span className="text-4xl text-stroke-black font-semibold text-white p-4 bg-gray-100/30 rounded-md">What I Have</span>
        </Link>
        <Link to={'/'} className="bg-coffee bg-left w-64 h-64 border border-slate-600 rounded-lg flex flex-col flex-nowrap justify-center items-center hover:opacity-90">
          <span className="text-4xl text-stroke-black font-semibold text-white p-4 bg-gray-100/30 rounded-md">What I Did</span>
        </Link>
      </div>
      <div className="flex flex-row justify-center my-4">
        <Link to={'/'} className="bg-mountains bg-center w-96 h-64 border border-slate-600 rounded-lg flex flex-col flex-nowrap justify-center items-center hover:opacity-90">
          <span className="text-4xl text-stroke-black font-semibold text-white p-4 bg-gray-100/30 rounded-md">Actions</span>
        </Link>
      </div>
    </div>
  )
}