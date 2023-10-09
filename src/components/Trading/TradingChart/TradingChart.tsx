import { useContext } from 'react'
import { TradeContext } from '../../../context/tradeContext'

// TODO: Use iframe wrapper to cut things

const TradingChart = () => {
  const { tradeState } = useContext(TradeContext)
  return (
    <div className="relative overflow-hidden h-[310px]">
      <iframe
        id="tradingview"
        name="tradingview"
        src={`https://poocoin.app/tokens/${tradeState.toToken.contract}`}
        width="100%"
        height="780px"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        className="absolute -translate-x-1/2 -translate-y-1/2 lg:top-[-15%] xl:top-[20%] left-1/2"
        onLoadedData={() => console.log('loaded iframe')}
      />
    </div>
  )
}

export default TradingChart
