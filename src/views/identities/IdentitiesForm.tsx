import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Identity, useIdentitiesState } from "../../state/identities";
import slugify from 'slugify';

interface IdentityForm {
  id: string;
  label: string;
  description: string;
  slug: string;
}

export default function IdentitiesForm({ identity }: { identity?: Identity }) {
  const isEditing = identity !== undefined;
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { isValid }  } = useForm<IdentityForm>();

  const onSubmit = async (values: Omit<IdentityForm, 'id' | 'slug'>) => {
    if (isEditing) {
      useIdentitiesState.getState().edit({
        id: identity.id,
        description: values.description,
        label: values.label,
        slug: slugify(values.label),
      })
    } else {
      useIdentitiesState.getState().add({
        id: uuidv4(),
        description: values.description,
        label: values.label,
        slug: slugify(values.label),
      });
    }

    navigate('/identities'); // TODO: should land on the detail view? or add new account view?
  };

  const onCancel = () => navigate('/identities');

  return <>
    <form id="identities-form" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <label className="mb-3 font-semibold">
          <span>Label&nbsp;</span>
          <span style={{ color: 'red' }}>*</span>
          <input
            {...register('label', { required: 'Label is required' })}
            defaultValue={identity?.label}
            className="input my-2 block p-1"
            type="text"
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          Description
          <input
            {...register('description')}
            defaultValue={identity?.description}
            className="input my-2 block p-1"
            type="textarea"
          />
        </label>
      </section>
      <section className='buttons-container'>
        <button className="button" onClick={onCancel}>❌ Cancel</button>
        <button className="button disabled:opacity-50" onClick={handleSubmit(onSubmit)} >💾 Save</button>
      </section>
    </form>
  </>
}