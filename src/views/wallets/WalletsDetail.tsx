import { Link, useNavigate, useParams } from "react-router-dom";
import { presentEthAddress } from "../../lib/utils";
import { useAddressesForWallet } from "../../state/addresses";
import { useWalletFromSlug } from "../../state/wallets";
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
          <h2 className="text-xl my-4">Addresses</h2>
          {
            addresses.map(a => {
              return <div key={a.id} className='flex flex-row flex-nowrap space-x-2'>
                <div className="font-medium">{a.label}</div>
                <div><code>{presentEthAddress(a.address)}</code></div>
              </div>
            })
          }
        </section>
      </>
    ) : null;
}
