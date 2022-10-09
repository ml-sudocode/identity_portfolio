import { v4 as uuidv4 } from 'uuid';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { Wallet, useWalletsState } from "../../state/wallets";
import slugify from 'slugify';

interface Option {
  value: string,
  label: string,
}

interface WalletForm {
  id: string;
  label: string;
  description: string;
  slug: string;
  backupLocation: Option[];
}

export const backupOptions = [
  { label: 'Brain Wallet', value: 'Brain Wallet' },
  { label: 'Paper Wallet', value: 'Paper Wallet' },
  { label: 'Hardware Wallet', value: 'Hardware Wallet' },
  { label: 'Password Manager', value: 'Password Manager' },
  { label: 'Safe', value: 'Safe' },
]

export default function WalletsForm({ wallet }: { wallet?: Wallet }) {
  const isEditing = wallet !== undefined;
  const navigate = useNavigate()
  const { control, register, handleSubmit, formState: { isValid }  } = useForm<WalletForm>();

  const onSubmit = async (values: Omit<WalletForm, 'id' | 'slug'>) => {
    if (isEditing) {
      useWalletsState.getState().edit({
        id: wallet.id,
        description: values.description,
        label: values.label,
        slug: slugify(values.label),
        backupLocation: values.backupLocation.map(p => p.value),

      })
    } else {
      useWalletsState.getState().add({
        id: uuidv4(),
        description: values.description,
        label: values.label,
        slug: slugify(values.label),
        backupLocation: values.backupLocation.map(p => p.value),
      });
    }

    navigate('/wallets'); // TODO: should land on the detail view? or add new account view?
  };

  const defaultLocation = () => {
    return wallet?.backupLocation.map(b => ({ label: b, value: b}));
  }

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
      <section>
        <label className="mb-3 font-semibold">
          <span>Backup Locations&nbsp;</span>
          <Controller
            name={"backupLocation"}
            control={control}
            defaultValue={defaultLocation()}
            render={({ field }) => {
              return (
                <CreatableSelect
                  {...field}
                  defaultValue={defaultLocation()}
                  isMulti
                  placeholder="Select one or more backup locations"
                  options={backupOptions}
                />
              )
            }}
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