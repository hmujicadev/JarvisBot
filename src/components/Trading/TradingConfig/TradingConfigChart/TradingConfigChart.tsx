import { Switch } from '@headlessui/react'
import { useContext } from 'react'
import { TradeContext } from '../../../../context/tradeContext'

const TradingConfigChart = () => {
  const { tradeConfig, toggleShowChart } = useContext(TradeContext)
  return (
    <div className="flex justify-between">
      <span className="text-white mb-1 text-sm font-medium">Token chart</span>
      <Switch
        checked={tradeConfig.showChart}
        onChange={() => toggleShowChart()}
        className={`${
          tradeConfig.showChart ? 'bg-jarvis-primary' : 'bg-jarvis-900'
        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jarvis-primary`}>
        <span
          aria-hidden="true"
          className={`${
            tradeConfig.showChart ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  )
}

export default TradingConfigChart
