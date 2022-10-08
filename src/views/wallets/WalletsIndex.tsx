import { useWallets } from "../../state/wallets"
import AddWalletButton from "./AddWalletButton";
import { WalletsSummary } from "./WalletsSummary";
import { WalletsTable } from "./WalletsTable";

export default function WalletsIndex() {
  const wallets = useWallets();

  return     <>
  <h1 className='text-2xl'>Wallets</h1>
  {
    wallets.length > 0 ?
      (
        <>
          <div className="flex flex-nowrap flex-row justify-between items-baseline">
            <AddWalletButton />
            <WalletsSummary />
          </div>
          <WalletsTable />
        </>
      ) :
      (
        <AddWalletButton />
      )
  }
</>
}