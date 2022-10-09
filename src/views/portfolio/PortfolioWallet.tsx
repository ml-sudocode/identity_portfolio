import { Link } from "react-router-dom";
import { useAddressesForWallet } from "../../state/addresses";
import { Wallet } from "../../state/wallets";

export default function PortfolioWallet({wallet}: {wallet: Wallet}) {
  const addresses = useAddressesForWallet(wallet.id);
  return <>
    <Link to={`/wallets/show/${wallet.slug}`}>
      <h2 className="text-xl my-4">{wallet.label}</h2>
    </Link>
    {
      addresses.map(a => {
        return <section>
          <Link to={`/addresses/show/${a.id}`}>
            <h3 className="text-lg my-4">{a.label}</h3> 
          </Link>
        </section>
      })
    }
  </>
}
