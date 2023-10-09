import { Transition } from '@headlessui/react'
import React, { useContext, useState } from 'react'
import TradeProvider, { TradeContext } from '../../context/tradeContext'
import TradingChart from './TradingChart/TradingChart'
import TradingConfig from './TradingConfig/TradingConfig'
import TradingPanel from './TradingPanel/TradingPanel'

const Trading = () => {
  const { loading, tradeState, tradeConfig } = useContext(TradeContext)
  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="container mx-auto px-4 flex flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-8/12">
          <Transition
            show={tradeConfig.showChart}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="relative row-span-2 self-center hidden lg:block">
              <TradingChart />
            </div>
          </Transition>
          <div className="relative">
            <TradingPanel />
          </div>
        </div>
        <div className="relative p-3 w-full lg:w-4/12">
          <TradingConfig />
        </div>
      </div>
    </div>
  )
}

const TradingContextWrapper = () => (
  <TradeProvider>
    <Trading />
  </TradeProvider>
)

export default TradingContextWrapper
