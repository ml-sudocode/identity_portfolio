import { v4 as uuidv4 } from 'uuid';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Transaction, useTransactionsState } from "../../state/transactions";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useAddress, useAddresses } from '../../state/addresses';
import { presentEthAddress } from '../../lib/utils';
import { format, getTime } from 'date-fns';

interface Option {
  value: string,
  label: string,
}

interface TransactionForm {
  id: string;
  date: number;
  addressId: Option;
  txHash: string;
  note: string;
  type: Option;
  amount: number;
}

export const typeOptions = [
  { label: 'Investment', value: 'Investment' },
  { label: 'Payment', value: 'Payment' },
  { label: 'Registration', value: 'Registration' },
  { label: 'Income', value: 'Income' },
  { label: 'Staking Yield', value: 'Staking Yield' },
  { label: 'Lending', value: 'Lending' },
]

export default function TransactionsForm({ transaction }: { transaction?: Transaction }) {
  const isEditing = transaction !== undefined;
  const [searchParams,] = useSearchParams(); // from AddTransactionButton on Address Detail page
  const queryParamAddress = useAddress(searchParams.get('addressId') ?? undefined);
  const navigate = useNavigate()
  const { control, register, handleSubmit  } = useForm<TransactionForm>();
  const addresses = useAddresses();

  const addressOptions = addresses.map(w => ({ label: `${w.label} (${presentEthAddress(w.address)})`, value: w.id }))
  const defaultAddressId = () => {
    if(queryParamAddress) { return { label: queryParamAddress.label, value: queryParamAddress.id } }

    if(transaction) {
      const a = addresses.find(addr => addr.id === transaction.addressId);
      return a ? { label: a.label, value: a.id } : undefined;
    }
  };

  const defaultType = () => {
    return transaction?.type ? { label: transaction.type, value: transaction.type } : undefined 
  }

  const defaultDate = transaction?.date ? format(transaction.date, 'y-MM-dd') : undefined;

  const onSubmit = async (values: Omit<TransactionForm, 'id'>) => {
    const msDate = getTime(new Date(values.date));

    if (isEditing) {
      useTransactionsState.getState().edit({
        id: transaction.id,
        date: msDate,
        note: values.note,
        type: values.type.value,
        amount: Number(values.amount),
        addressId: values.addressId.value,
        txHash: values.txHash,
      })
    } else {
      useTransactionsState.getState().add({
        id: uuidv4(),
        date: msDate,
        note: values.note,
        type: values.type.value,
        amount: Number(values.amount),
        addressId: values.addressId.value,
        txHash: values.txHash,
      });
    }

    navigate('/transactions'); // TODO: should land on the detail view? or add new account view?
  };

  const onCancel = () => navigate('/transactions');

  return <>
    <form id="transactions-form" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <label className="mb-3 font-semibold">
          Note
          <input
            {...register('note')}
            defaultValue={transaction?.note}
            className="input my-2 block p-1"
            type="textarea"
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          Date
          <input
            {...register('date')}
            type="date"
            className="input my-2 block p-1"
            defaultValue={defaultDate}
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          <span>TX Hash&nbsp;</span>
          <span style={{ color: 'red' }}>*</span>
          <input
            {...register('txHash')}
            defaultValue={transaction?.txHash}
            className="input my-2 block p-1"
            type="text"
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          <span>Amount&nbsp;</span>
          <span style={{ color: 'red' }}>*</span>
          <input
            {...register('amount', { required: 'Amount is required' })}
            defaultValue={transaction?.amount}
            className="input my-2 block p-1"
            type="number"
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          <span>Type&nbsp;</span>
          <Controller
            name={"type"}
            control={control}
            defaultValue={defaultType()}
            render={({ field }) => {
              return (
                <CreatableSelect
                  {...field}
                  defaultValue={defaultType()}
                  isMulti
                  placeholder="Select one or more types"
                  options={typeOptions}
                />
              )
            }}
          />
        </label>
      </section>
      <section>
        <label className="mb-3 font-semibold">
          <span>Address&nbsp;</span>
          <Controller
            name={"addressId"}
            control={control} 
            defaultValue={defaultAddressId()}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  defaultValue={defaultAddressId()}
                  options={addressOptions}
                  placeholder="Select an address"
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