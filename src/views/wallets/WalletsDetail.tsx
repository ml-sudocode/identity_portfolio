import { Link, useNavigate, useParams } from "react-router-dom";
import { useWalletFromSlug } from "../../state/wallets";
import DeleteWalletButton from "./DeleteWalletButton";
import EditWalletButton from "./EditWalletButton";

export default function WalletsDetail() {
  const { slug } = useParams<{slug: string}>();
  const wallet = useWalletFromSlug(slug);
  const navigate = useNavigate();
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
          <h2 className="text-xl my-4">Accounts</h2>
        </section>
      </>
    ) : null;
}
