import _ from 'lodash'
import { useContext } from 'react'
import Link from 'next/link'
import { axios } from '../../../config/axios'
import { TradeContext } from '../../../context/tradeContext'
import { API_ROUTES } from '../../../routes'
import { appStore } from '../../../store/appStore'
import { ProviderT } from '../../../types/global'
import { displayNotification, getPercentage } from '../../../utils'
import Notification from '../../global/Notification/Notification'
import BuySellPanel from './BuySellPanel/BuySellPanel'

const TradingPanel = () => {
  const {
    loading,
    tradeState: { fromAmount, toAmount, fromToken, toToken },
    tradeConfig: { selectedWallets, gasLimit, gweiCost, slippage },
    beginTransacion
  } = useContext(TradeContext)
  const handleSubmit = async () => {
    const provider: ProviderT = appStore.appData.provider
    let errorMessage = null

    let walletPrivateKeysArray: Array<string> = []
    selectedWallets?.forEach(({ privateKey }) => walletPrivateKeysArray.push(privateKey))

    if (!selectedWallets?.length) errorMessage = 'Must select one wallet to trade'
    if (1 < (selectedWallets?.length || 0)) errorMessage = 'Must select only one wallet to trade'
    if (_.isUndefined(provider.httpsURL) || _.isUndefined(provider.wssURL))
      errorMessage = 'Go to config page and select a valid provider'
    if (!_.isNull(errorMessage)) {
      displayNotification(<Notification text={errorMessage} type="warn" />, { type: 'warning' })
      return
    }

    const tradeData = {
      walletPrivateKeys: `${walletPrivateKeysArray.join(',')}`,
      tokenToSpend: fromToken.contract,
      tokenToBuy: toToken.contract,
      amount: fromAmount.toString(),
      gasLimit: gasLimit.toString(),
      gweiCost: gweiCost.toString(),
      slippage: '0',
      provider: appStore.appData.provider
    }
    console.log(tradeData)

    const response = await beginTransacion(tradeData)
    const { ok, error, data } = response
    if (!ok) {
      displayNotification(<Notification text={error} type="error" />, { type: 'error' })
      return
    }
    displayNotification(
      <Notification type="success">
        <>
          <p className="text-sm font-medium text-gray-200">Transaction sended!</p>
          <Link href={data.bscscanURL}>
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="underline underline-offset-1 text-jarvis-100">
              View on bscscan
            </a>
          </Link>
        </>
      </Notification>,
      {
        type: 'success'
      }
    )
  }

  return (
    <div className="relative p-3">
      <div className="px-5 py-2 rounded-lg grid grid-cols-1 gap-x-8 gap-y-1 bg-jarvis-card">
        <BuySellPanel handleSubmit={() => handleSubmit()} />
      </div>
    </div>
  )
}

export default TradingPanel
