import { Fragment, useContext } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import { TradeContext } from '../../../../context/tradeContext'
import { appStore } from '../../../../store/appStore'

// TODO: Make this reusable for presale

const TradingConfigWallets = () => {
  const { loading, tradeState, tradeConfig, updateSelectedWallets } = useContext(TradeContext)
  return (
    <div className="flex items-center justify-between">
      <p className="text-white text-sm font-medium">Wallets</p>
      <div className="w-2/3">
        <Listbox value={null} onChange={updateSelectedWallets}>
          <div className="relative mt-1">
            <Listbox.Button
              className={`${
                appStore.appData.wallets.length
                  ? 'cursor-pointer'
                  : 'border-2 border-red-600 text-red-600 placeholder-red-600 cursor-default'
              } shadow-2xlrelative w-full py-1 h-8 pl-3 pr-10 text-left bg-gray-800 text-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-jarvis-400 focus-visible:ring-offset-2 sm:text-sm`}>
              <span className="block truncate">
                {tradeConfig.selectedWallets?.length
                  ? `${tradeConfig.selectedWallets?.length} selected`
                  : appStore.appData.wallets.length
                  ? 'No selected'
                  : 'No wallets to use'}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-grenn-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            {appStore.appData.wallets.length ? (
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-jarvis-200 ring-opacity-5 focus:outline-none sm:text-sm">
                  {appStore.appData.wallets.map((wallet: any, idx: number) => (
                    <Listbox.Option
                      key={`${wallet.alias}-${idx}`}
                      className={({ active }) =>
                        `${active ? 'bg-jarvis-800' : ''}
              text-white select-none relative py-2 pl-10 pr-4 cursor-pointer`
                      }
                      value={wallet}>
                      {({ active }) => (
                        <>
                          <span className="font-normal block truncate">{wallet.alias}</span>
                          {tradeConfig.selectedWallets &&
                          tradeConfig.selectedWallets.includes(wallet) ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-jarvis-100">
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            ) : null}
          </div>
        </Listbox>
      </div>
    </div>
  )
}

export default TradingConfigWallets
