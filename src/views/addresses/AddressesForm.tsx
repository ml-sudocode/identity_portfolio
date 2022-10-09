import { v4 as uuidv4 } from 'uuid';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Address, useAddresses, useAddressesState } from "../../state/addresses";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useWallet, useWallets } from '../../state/wallets';
import { useMemo } from 'react';
import { randomElement } from '../../lib/utils';
import { addressNames } from '../../constants';

interface Option {
  value: string,
  label: string,
}

interface AddressForm {
  id: string;
  walletId: Option;
  address: string;
  label: string;
  description: string;
  purpose: Option[];
}

export const defaultPurposeOptions = [
  { label: 'Conference', value: 'Conference' },
  { label: 'DAO', value: 'DAO' },
  { label: 'DeFi', value: 'DeFi' },
  { label: 'Hackathon', value: 'Hackathon' },
  { label: 'Hodl', value: 'Hodl' },
  { label: 'Investing', value: 'Investing' },
  { label: 'NFT', value: 'NFT' },
  { label: 'Payments', value: 'Payments' },
  { label: 'Testing', value: 'Testing' },
]

export default function AddressesForm({ address }: { address?: Address }) {
  const isEditing = address !== undefined;
  const [searchParams,] = useSearchParams(); // from AddAddressButton
  const queryParamWallet = useWallet(searchParams.get('walletId') ?? undefined);
  const navigate = useNavigate()
  const { control, register, handleSubmit, formState: { isValid }  } = useForm<AddressForm>();
  const wallets = useWallets();
  const addresses = useAddresses();

  const walletOptions = wallets.map(w => ({ label: w.label, value: w.id }))
  const defaultWalletId = () => {
    if(queryParamWallet) { return { label: queryParamWallet.label, value: queryParamWallet.id } }

    if(address) {
      const w = wallets.find(w => w.id === address.walletId);
      return w ? { label: w.label, value: w.id } : undefined;
    }
  };

  const defaultPurpose = () => {
    return address?.purpose.map(p => ({ label: p, value: p}));
  }

  const onSubmit = async (values: Omit<AddressForm, 'id'>) => {
    let newId;
    if (isEditing) {
      useAddressesState.getState().edit({
        id: address.id,
        address: values.address,
        description: values.description,
        label: values.label,
        purpose: values.purpose.map(p => p.value),
        walletId: values.walletId.value,
      })
    } else {
      newId = uuidv4();
      useAddressesState.getState().add({
        id: newId,
        address: values.address,
        description: values.description,
        label: values.label,
        purpose: values.purpose.map(p => p.value),
        walletId: values.walletId.value,
      });
    }

    navigate(`/addresses/show/${newId ?? address?.id}`);
  };

  const onCancel = () => navigate('/addresses');

  const defaultAddressName = useMemo(() => {
    let attemptCount = 0;
    const attemptLimit = 10;
    let newName;
    let wallet;

    if(defaultWalletId()) {
      wallet = wallets.find(w => w.id === defaultWalletId()?.value)
    }

    if(!wallet) {
      return;
    }

    do {
      newName = randomElement(addressNames[wallet.label as keyof typeof addressNames] || []);
      attemptCount += 1;
    } while (addresses.map(a => a.label).includes(newName) || attemptCount === attemptLimit);

    return newName;
  }, [wallets]);

  return <>
    <form id="addresses-form" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <label className="mb-3 font-semibold">
          <span>Label&nbsp;</span>
          <span style={{ color: 'red' }}>*</span>
          <input
            {...register('label', { required: 'Label is required' })}
            defaultValue={address?.label}
            // defaultValue={address?.label ?? defaultAddressName}
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
            defaultValue={address?.description}
            className="input my-2 block p-1"
            type="textarea"
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          <span>Address&nbsp;</span>
          <span style={{ color: 'red' }}>*</span>
          <input
            {...register('address', { required: 'Address is required' })}
            defaultValue={address?.address}
            className="input my-2 block p-1"
            type="text"
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          <span>Purpose&nbsp;</span>
          <Controller
            name={"purpose"}
            control={control}
            defaultValue={defaultPurpose()}
            render={({ field }) => {
              return (
                <CreatableSelect
                  {...field}
                  defaultValue={defaultPurpose()}
                  isMulti
                  placeholder="Select one or more purposes"
                  options={defaultPurposeOptions}
                />
              )
            }}
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          <span>Wallet&nbsp;</span>
          <Controller
            name={"walletId"}
            control={control} 
            defaultValue={defaultWalletId()}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  defaultValue={defaultWalletId()}
                  placeholder="Select a wallet"
                  options={walletOptions}
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
