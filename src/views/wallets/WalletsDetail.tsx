import { Link, useNavigate, useParams } from "react-router-dom";
import { presentEthAddress } from "../../lib/utils";
import { useAddressesForWallet } from "../../state/addresses";
import { useWalletFromSlug } from "../../state/wallets";
import AddAddressButton from "../addresses/AddAddressButton";
import { AddressesTable } from "../addresses/AddressesTable";
import { AddressSummary } from "../addresses/AddressSummary";
import DeleteWalletButton from "./DeleteWalletButton";
import EditWalletButton from "./EditWalletButton";

export default function WalletsDetail() {
  const { slug } = useParams<{slug: string}>();
  const wallet = useWalletFromSlug(slug);
  const navigate = useNavigate();
  const addresses = useAddressesForWallet(wallet?.id);
  if(!wallet) { navigate('/') }

  return wallet ? 
    (
      <>
        <h1 className='text-2xl'><Link to={'/wallets'} className='text-gray-500'>Wallets /</Link> {wallet?.label}</h1>
        <div className="buttons-container">
          <EditWalletButton slug={wallet.slug} />
          <DeleteWalletButton id={wallet.id} />
        </div>
        <section className="my-2">
          <h2 className="text-xl my-4">Description</h2>
          <p>{wallet.description}</p>
        </section>
        <section className="my-2">
          <h2 className="text-xl my-4">Backup Locations</h2>
          <p className="space-x-2">{wallet.backupLocation.map(b => <span key={b} className='p-1 bg-slate-100 text-sm border text-light rounded-lg'>{b}</span>)}</p>
        </section>
        <section className="my-2">
          <h2 className="text-xl my-4">Addresses</h2>
          <div className="flex flex-nowrap flex-row justify-between items-baseline">
            <AddAddressButton walletId={wallet.id} />
            <AddressSummary walletId={wallet.id} />
          </div>
          <AddressesTable walletId={wallet.id} />
        </section>
      </>
    ) : null;
}
