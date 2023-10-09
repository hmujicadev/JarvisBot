import { TrashIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { view } from 'react-osh'
import { appStore } from '../../../store/appStore'
import { displayNotification, encryptData } from '../../../utils'
import Notification from '../../global/Notification/Notification'
import { WalletValues } from '../../../types/global'

// TODO: Refactor with WalletSettingItem
// TODO: Add "Create random wallet" functionality

const WalletSettings = view(() => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<WalletValues>({
    defaultValues: {
      wallets: appStore.appData.wallets
    },
    mode: 'onBlur'
  })
  const { fields, append, remove, replace } = useFieldArray({
    name: 'wallets',
    control
  })

  const onSsubmit = (data: WalletValues) => {
    appStore.setData(data)
    displayNotification(<Notification text="Saved" type="info" />, { type: 'info' })
  }

  useEffect(() => {
    const storedWallets = appStore.appData.wallets
    if (storedWallets) replace(storedWallets)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg leading-6 font-medium text-jarvis-primary">Wallets</h3>
        <p className="mt-1 max-w-2xl text-sm text-jarvis-secondary">
          Wallets to be used through all the app
        </p>
      </div>
      <form onSubmit={handleSubmit(onSsubmit)} className="space-y-6 text-center" autoComplete="off">
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className="flex items-center justify-around" key={field.id}>
                <div className="w-1/5">
                  <label
                    htmlFor="alias"
                    className="block text-left text-sm font-light text-jarvis-primary">
                    Alias
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      placeholder="Alias for wallet"
                      {...register(`wallets.${index}.alias` as const, {
                        required: true
                      })}
                      className={`${
                        errors?.wallets?.[index]?.alias
                          ? 'border-red-600 text-red-600 placeholder-red-600'
                          : 'border-gray-300'
                      } shadow-sm outline-none block w-full sm:text-sm rounded-md bg-transparent focus:bg-white text-white focus:text-black transform transition-colors`}
                    />
                  </div>
                </div>
                <div className="w-4/6">
                  <label
                    htmlFor="privateKey"
                    className="block text-left text-sm font-light text-jarvis-primary">
                    Seed
                  </label>
                  <div className="mt-1">
                    <input
                      placeholder="Wallet seed"
                      type="password"
                      {...register(`wallets.${index}.privateKey` as const, {
                        required: true
                      })}
                      className={`${
                        errors?.wallets?.[index]?.privateKey
                          ? 'border-red-600 text-red-600 placeholder-red-600'
                          : 'border-gray-300'
                      } shadow-sm outline-none block w-full sm:text-sm rounded-md bg-transparent focus:bg-white placeholder-white text-white focus:text-black transform transition-colors`}
                    />
                  </div>
                </div>
                <div className="w-12">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    title="Remove wallet"
                    className="w-full mt-6 bg-transparent py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-400 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition-all flex justify-center items-center">
                    <TrashIcon className="relative h-5 w-5" />
                  </button>
                </div>
              </section>
            </div>
          )
        })}

        <div className="w-full px-4">
          <button
            type="button"
            className="w-full bg-transparent py-2 px-4 border-dashed border-2 border-jarvis-primary rounded-md shadow-sm text-sm font-medium text-jarvis-primary hover:bg-jarvis-primary hover:text-jarvis-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:jarvis-primary transform transition-colors"
            onClick={() =>
              append({
                alias: '',
                privateKey: ''
              })
            }>
            Add new wallet
          </button>
        </div>
        <div className="sm:col-span-6">
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-jarvis-900 bg-jarvis-100 hover:bg-jarvis-100/80 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400/40 disabled:text-gray-400 disabled:opacity-40 disabled:cursor-default focus:jarvis-primary transition-colors">
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  )
})

export default WalletSettings
