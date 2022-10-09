import { v4 as uuidv4 } from 'uuid';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { Wallet, useWalletsState, useWallets } from "../../state/wallets";
import slugify from 'slugify';
import { randomElement } from '../../lib/utils';
import { walletNames } from '../../constants';
import { useMemo } from 'react';

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
  browsers: Options[];
  devices: Options[];
}

export const backupOptions = [
  { label: 'Brain Wallet', value: 'Brain Wallet' },
  { label: 'Paper Wallet', value: 'Paper Wallet' },
  { label: 'Hardware Wallet', value: 'Hardware Wallet' },
  { label: 'Password Manager', value: 'Password Manager' },
  { label: 'Safe', value: 'Safe' },
]

export const deviceOptions = [
  { label: 'iPhone', value: 'iPhone' },
  { label: 'Chromebook', value: 'Chromebook' },
  { label: 'Browser', value: 'Browser' },
  { label: 'Metamask', value: 'Metamask' },  
  { label: 'Ledger', value: 'Ledger' },  
  { label: 'Trezor', value: 'Trezor' },  
];

export const browserOptions = [
  { label: 'Chrome', value: 'Chrome' },
  { label: 'Brave', value: 'Brave' },
  { label: 'Firefox', value: 'Firefox' },
  { label: 'Safari', value: 'Safari' },  
] ;

export default function WalletsForm({ wallet }: { wallet?: Wallet }) {
  const isEditing = wallet !== undefined;
  const wallets = useWallets();
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
        devices: values.devices.map(p => p.value),
        browsers: values.browsers.map(p => p.value),
      })
    } else {
      useWalletsState.getState().add({
        id: uuidv4(),
        description: values.description,
        label: values.label,
        slug: slugify(values.label),
        backupLocation: values.backupLocation.map(p => p.value),
        devices: values.devices.map(p => p.value),
        browsers: values.browsers.map(p => p.value),
      });
    }

    navigate('/wallets'); // TODO: should land on the detail view? or add new account view?
  };

  const defaultLocation = () => {
    return wallet?.backupLocation.map(b => ({ label: b, value: b}));
  }

  const defaultBrowser = () => {
    return wallet?.browsers.map(b => ({ label: b, value: b}));
  }

  const defaultDevice = () => {
    return wallet?.devices.map(b => ({ label: b, value: b}));
  }

  const onCancel = () => navigate('/wallets');

  const defaultWalletName = useMemo(() => {
    let attemptCount = 0;
    const attemptLimit = 10;
    let newName;
    do {
      newName = randomElement(walletNames);
      attemptCount += 1;
    } while (wallets.map(w => w.label).includes(newName) || attemptCount === attemptLimit);

    return newName;
  }, [wallets]);

  return <>
    <form id="wallets-form" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <label className="mb-3 font-semibold">
          <span>Label&nbsp;</span>
          <span style={{ color: 'red' }}>*</span>
          <input
            {...register('label', { required: 'Label is required' })}
            // defaultValue={wallet?.label ?? defaultWalletName}
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
      <section>
        <label className="mb-3 font-semibold">
          <span>Devices&nbsp;</span>
          <Controller
            name={"devices"}
            control={control}
            defaultValue={defaultDevice()}
            render={({ field }) => {
              return (
                <CreatableSelect
                  {...field}
                  defaultValue={defaultDevice()}
                  isMulti
                  placeholder="Select one or more devices"
                  options={deviceOptions}
                />
              )
            }}
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          <span>Browsers&nbsp;</span>
          <Controller
            name={"browsers"}
            control={control}
            defaultValue={defaultBrowser()}
            render={({ field }) => {
              return (
                <CreatableSelect
                  {...field}
                  defaultValue={defaultBrowser()}
                  isMulti
                  placeholder="Select one or more browsers"
                  options={browserOptions}
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
