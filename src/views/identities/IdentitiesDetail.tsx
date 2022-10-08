import { Link, useNavigate, useParams } from "react-router-dom";
import { useIdentityFromSlug } from "../../state/identities";
import DeleteIdentityButton from "./DeleteIdentityButton";
import EditIdentityButton from "./EditIdentityButton";

export default function IdentitiesDetail() {
  const { slug } = useParams<{slug: string}>();
  const identity = useIdentityFromSlug(slug);
  const navigate = useNavigate();
  if(!identity) { navigate('/') }

  return identity ? 
    (
      <>
        <h1 className='text-2xl'><Link to={'/identities'} className='text-gray-500'>Identities /</Link> {identity?.label}</h1>
        <div className="buttons-container">
          <EditIdentityButton slug={identity.slug} />
          <DeleteIdentityButton id={identity.id} />
        </div>
        <section className="my-2">
          <h2 className="text-xl my-4">Description</h2>
          <p>{identity.description}</p>
        </section>
        <section className="my-2">
          <h2 className="text-xl my-4">Accounts</h2>
        </section>
      </>
    ) : null;
}
