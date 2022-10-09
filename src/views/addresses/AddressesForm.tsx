import { v4 as uuidv4 } from 'uuid';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Address, useAddressesState } from "../../state/addresses";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useWallets } from '../../state/wallets';
import { useMemo } from 'react';

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
  balance: number;
}

const defaultPurposeOptions = [
  { label: 'Conference', value: 'Conference' },
  { label: 'DAO', value: 'DAO' },
  { label: 'DeFi', value: 'DeFi' },
  { label: 'Hackathon', value: 'Hackathon' },
  { label: 'Hodl', value: 'Hodl' },
  { label: 'Investing', value: 'Investing' },
  { label: 'NFT', value: 'NFT' },
  { label: 'Testing', value: 'Testing' },
]

export default function AddressesForm({ address }: { address?: Address }) {
  const isEditing = address !== undefined;
  const navigate = useNavigate()
  const { control, register, handleSubmit, formState: { isValid }  } = useForm<AddressForm>();
  const wallets = useWallets();

  console.log(wallets);
  const walletOptions = wallets.map(w => ({ label: w.label, value: w.id }))
  const defaultWalletId = () => {
    if(address) {
      const w = wallets.find(w => w.id === address.walletId);
      return w ? { label: w.label, value: w.id } : undefined;
    }
  };

  const onSubmit = async (values: Omit<AddressForm, 'id'>) => {
    console.log(values);
    if (isEditing) {
      useAddressesState.getState().edit({
        id: address.id,
        address: values.address,
        description: values.description,
        label: values.label,
        purpose: values.purpose.map(p => p.value),
        balance: Number(values.balance),
        walletId: values.walletId.value,
      })
    } else {
      useAddressesState.getState().add({
        id: uuidv4(),
        address: values.address,
        description: values.description,
        label: values.label,
        purpose: values.purpose.map(p => p.value),
        balance: Number(values.balance),
        walletId: values.walletId.value,
      });
    }

    navigate('/addresses'); // TODO: should land on the detail view? or add new account view?
  };

  const onCancel = () => navigate('/addresses');

  return <>
    <form id="addresses-form" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <label className="mb-3 font-semibold">
          <span>Label&nbsp;</span>
          <span style={{ color: 'red' }}>*</span>
          <input
            {...register('label', { required: 'Label is required' })}
            defaultValue={address?.label}
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
          <span>Balance&nbsp;</span>
          <span style={{ color: 'red' }}>*</span>
          <input
            {...register('balance', { required: 'Balance is required' })}
            defaultValue={address?.balance}
            className="input my-2 block p-1"
            type="number"
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          <span>Purpose&nbsp;</span>
          <Controller
            name={"purpose"}
            control={control} 
            render={({ field }) => {
              return (
                <CreatableSelect
                  {...field}
                  defaultValue={address?.purpose.map(p => ({ label: p, value: p}))}
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