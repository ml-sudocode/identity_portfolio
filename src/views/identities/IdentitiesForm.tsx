import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Identity } from "../../state/identities";

interface IdentityForm {
  id: string;
  label: string;
  slug: string;
  tags: string[];
}

export default function IdentitiesForm({ identity }: { identity?: Identity }) {
  const isEditing = identity !== undefined;
  const navigate = useNavigate()
  const { register, handleSubmit, reset, watch, setValue, formState: { isValid }  } = useForm<IdentityForm>();

  
}