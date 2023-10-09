import TradeInput from '../../../global/TradeInput/TradeInput'
import _, { capitalize } from 'lodash'
import TradeSelect from '../../../global/TradeSelect/TradeSelect'
import { ChangeEvent, useContext } from 'react'
import { TradeContext } from '../../../../context/tradeContext'
import { ProviderT, TradeFormKeysI, TradeFormValuesI, TradeTokenT } from '../../../../types/global'
import { RefreshIcon, SwitchVerticalIcon } from '@heroicons/react/outline'
import { appStore } from '../../../../store/appStore'

// TODO: Undo into a simple form like PancakeSwap

interface BuySellPanelIProps {
  handleSubmit: () => void
}

const BuySellPanel = ({ handleSubmit }: BuySellPanelIProps) => {
  const {
    loading,
    tradeState,
    tradeConfig,
    updateTradeState,
    getMaxBalance,
    invertSelectedTokens,
    reduceAmountByPercentage,
    refreshPrices
  } = useContext(TradeContext)

  const handleUpdate = (data: TradeFormValuesI) => updateTradeState({ ...data })

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>, storeField: TradeFormKeysI) =>
    handleUpdate({ [storeField]: e.currentTarget.value })

  const handleTokenChange = (token: TradeTokenT, storeField: TradeFormKeysI) =>
    handleUpdate({ [storeField]: token })

  const handleMaxBalance = async () => {
    let walletPrivateKeysArray: Array<string> = []
    tradeConfig.selectedWallets?.forEach(({ privateKey }) =>
      walletPrivateKeysArray.push(privateKey)
    )
    await getMaxBalance({
      walletPrivateKeys: `${walletPrivateKeysArray.join(',')}`,
      tokenAddress: tradeState.fromToken.contract,
      provider: appStore.appData.provider
    })
  }

  return (
    <div className="flex flex-col items-center py-4 space-y-3">
      {/* <p className="text-white font-medium text-xl">{}</p> */}
      {/* TODO: Add "Max." button to set set Max. balance */}
      <div className="w-full">
        <TradeInput
          label="From"
          onChange={(e) => handleAmountChange(e, 'fromAmount')}
          value={tradeState.fromAmount}
          readOnly={loading}
          name={'fromAmount'}>
          <div className="flex space-x-1">
            <TradeSelect
              selected={tradeState.fromToken}
              handleTokenChange={(tokenAddress) => handleTokenChange(tokenAddress, 'fromToken')}
            />
            {appStore.appData.wallets.length && tradeConfig.selectedWallets?.length && (
              <button
                disabled={loading}
                title="Max balance"
                className="border border-dashed border-gray-400/50 p-1 rounded bg-transparent text-gray-300/50 hover:bg-jarvis-300 hover:text-white disabled:opacity-40 disabled:cursor-default transition-colors"
                onClick={handleMaxBalance}>
                Max
              </button>
            )}
          </div>
        </TradeInput>
      </div>
      <div className="w-full flex items-center justify-around space-x-2">
        <span>
          <button
            disabled={loading}
            title="Refresh price"
            onClick={refreshPrices}
            className="bg-gray-600/20 rounded-l-md p-2 text-gray-300 border-2 border-gray-500 hover:bg-gray-700  disabled:opacity-40 disabled:cursor-default transition-colors">
            <RefreshIcon className="w-6" />
          </button>
          <button
            disabled={loading}
            title="Invert tokens"
            onClick={invertSelectedTokens}
            className="bg-gray-600/20 rounded-r-md p-2 text-gray-300 border-2 border-gray-500 hover:bg-gray-700  disabled:opacity-40 disabled:cursor-default transition-colors">
            <SwitchVerticalIcon className="w-6" />
          </button>
        </span>
        <span className="w-5/6 flex justify-around">
          {[15, 25, 50, 75].map((item, idx) => (
            <button
              disabled={loading}
              key={item}
              title={`${item}%`}
              onClick={() => reduceAmountByPercentage(item)}
              className={`${
                idx === 0 ? 'rounded-l-md ' : idx === 3 ? 'rounded-r-md ' : ''
              } w-2/4 bg-gray-600/20 p-2 text-gray-300 border-2 border-gray-500 hover:bg-gray-700  disabled:opacity-40 disabled:cursor-default transition-colors`}>
              {item}%
            </button>
          ))}
        </span>
      </div>
      <div className="mb-2 w-full">
        <TradeInput
          label="To"
          onChange={(e) => handleAmountChange(e, 'toAmount')}
          value={tradeState.toAmount}
          name={'toAmount'}
          readOnly
          type="text">
          <TradeSelect
            selected={tradeState.toToken}
            handleTokenChange={(tokenAddress) => handleTokenChange(tokenAddress, 'toToken')}
          />
        </TradeInput>
      </div>
      <div className="text-left text-white w-full mb-8 text-xs ml-1 flex justify-between items-center flex-wrap lg:flex-nowrap">
        Via <span className="text-gray-500 mr-auto ml-1">Pancakeswap</span>
        {tradeState.fromToken.price !== 0 && (
          <span className="w-full lg:w-auto truncate">
            {`1 ${tradeState.fromToken.symbol} = ${parseFloat(
              tradeState.fromToken.price_BNB
            ).toFixed(8)} BNB`}
          </span>
        )}
      </div>
      {/* TODO: Change buttons to force to refresh amount to receive in secs */}

      <button
        onClick={handleSubmit}
        disabled={loading || (tradeState.fromAmount === 0 && tradeState.toAmount === 0)}
        type="submit"
        className={
          'bg-jarvis-300 shadow-jarvis-300/50 shadow-lg px-2 py-4 text-2xl text-white w-full text-center cursor-pointer hover:bg-opacity-80 transform transition-colors disabled:bg-gray-600 disabled:text-white/50 disabled:cursor-default disabled:shadow-none rounded-md'
        }>
        Trade
      </button>
    </div>
  )
}

export default BuySellPanel
