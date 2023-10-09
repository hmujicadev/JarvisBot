import TradingConfigChart from './TradingConfigChart/TradingConfigChart'
import TradingConfigGas from './TradingConfigGas/TradingConfigGas'
import TradingConfigWallets from './TradingConfigWallets/TradingConfigWallets'

const TradingConfig = () => {
  return (
    <div className="p-4 py-5 space-y-4 rounded-lg bg-jarvis-card ">
      <span className="text-white text-xl">Trade settings</span>
      <div className="text-left p-2 rounded-md  border-2 border-jarvis-500">
        <TradingConfigWallets />
      </div>
      <div className="p-2 rounded-md border-2 border-jarvis-500">
        <TradingConfigGas />
      </div>
      <div className="p-2 rounded-md border-2 border-jarvis-500">
        <TradingConfigChart />
      </div>
    </div>
  )
}

export default TradingConfig
