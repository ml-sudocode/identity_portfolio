import { useIdentities } from "../../state/identities"
import AddIdentityButton from "./AddIdentityButton";
import { IdentitiesSummary } from "./IdentitiesSummary";
import { IdentitiesTable } from "./IdentitiesTable";

export default function IdentitiesIndex() {
  const identities = useIdentities();

  return     <>
  <h1 className='text-2xl'>Identities</h1>
  {
    identities.length > 0 ?
      (
        <>
          <div className="flex flex-nowrap flex-row justify-between items-baseline">
            <AddIdentityButton />
            <IdentitiesSummary />
          </div>
          <IdentitiesTable />
        </>
      ) :
      (
        <AddIdentityButton />
      )
  }
</>
}