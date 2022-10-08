import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Wallet, useWalletsState } from "../../state/wallets";
import slugify from 'slugify';

interface WalletForm {
  id: string;
  label: string;
  description: string;
  slug: string;
}

export default function WalletsForm({ wallet }: { wallet?: Wallet }) {
  const isEditing = wallet !== undefined;
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { isValid }  } = useForm<WalletForm>();

  const onSubmit = async (values: Omit<WalletForm, 'id' | 'slug'>) => {
    if (isEditing) {
      useWalletsState.getState().edit({
        id: wallet.id,
        description: values.description,
        label: values.label,
        slug: slugify(values.label),
      })
    } else {
      useWalletsState.getState().add({
        id: uuidv4(),
        description: values.description,
        label: values.label,
        slug: slugify(values.label),
      });
    }

    navigate('/wallets'); // TODO: should land on the detail view? or add new account view?
  };

  const onCancel = () => navigate('/wallets');

  return <>
    <form id="wallets-form" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <label className="mb-3 font-semibold">
          <span>Label&nbsp;</span>
          <span style={{ color: 'red' }}>*</span>
          <input
            {...register('label', { required: 'Label is required' })}
            defaultValue={wallet?.label}
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
            defaultValue={wallet?.description}
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