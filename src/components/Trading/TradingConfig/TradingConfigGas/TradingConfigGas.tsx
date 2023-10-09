import { useContext } from 'react'
import { TradeContext } from '../../../../context/tradeContext'

// TODO: Add estimated gas as gasLimit
// gasPrice = await provider.getGasPrice()

const TradingConfigGas = () => {
  const { tradeConfig, onChangeTradeConfig } = useContext(TradeContext)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-white">Gas limit</label>
        <div>
          <input
            id="gasLimit"
            name="gasLimit"
            type="number"
            onChange={(e) => onChangeTradeConfig(e.currentTarget.value, 'gasLimit')}
            onKeyPress={(e) => e.key === 'e' || e.key === '-'}
            onFocus={(e) => e.target.select()}
            className="text-right text-white bg-gray-800 border-none focus:outline-none ring-0 focus:ring-jarvis-100 focus:border-jarvis-100 focus:shadow-lg focus:shadow-jarvis-300/50 block w-full sm:text-sm rounded-md"
            value={tradeConfig.gasLimit}
            min={0}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label className="text-white">Gwei cost</label>
        <div>
          <input
            id="gweiCost"
            name="gweiCost"
            type="number"
            onChange={(e) => onChangeTradeConfig(e.currentTarget.value, 'gweiCost')}
            onKeyPress={(e) => e.key === 'e' || e.key === '-'}
            onFocus={(e) => e.target.select()}
            className="text-right text-white bg-gray-800 border-none focus:outline-none ring-0 focus:ring-jarvis-100 focus:border-jarvis-100 focus:shadow-lg focus:shadow-jarvis-300/50 block w-full sm:text-sm rounded-md"
            value={tradeConfig.gweiCost}
            min={0}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label className="text-white">Slippage (%)</label>
        <div>
          <input
            id="slippage"
            name="slippage"
            type="number"
            onChange={(e) => onChangeTradeConfig(e.currentTarget.value, 'slippage')}
            onKeyPress={(e) => e.key === 'e' || e.key === '-'}
            onFocus={(e) => e.target.select()}
            className="text-right text-white bg-gray-800 border-none focus:outline-none ring-0 focus:ring-jarvis-100 focus:border-jarvis-100 focus:shadow-lg focus:shadow-jarvis-300/50 block w-full sm:text-sm rounded-md"
            value={tradeConfig.slippage}
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  )
}

export default TradingConfigGas
