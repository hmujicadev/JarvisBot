import React, { createContext, useEffect, useState } from 'react'
import { TradeConfigI, TradeFormValuesI, WalletT } from '../types/global'
import BSC_TOKENS from '../data/bscTokens.json'
import { axios } from '../config/axios'
import { API_ROUTES } from '../routes'
import { encryptData, getPercentage } from '../utils'
import { DEFAULT_GAS_LIMIT, DEFAULT_GWEI_PRICE } from '../constants'

type TradeProviderState = {
  loading: boolean
  tradeState: TradeFormValuesI
  tradeConfig: TradeConfigI
  toggleShowChart: () => void
  updateSelectedWallets: (wallet: WalletT) => void
  onChangeTradeConfig: (value: string, field: 'gasLimit' | 'gweiCost' | 'slippage') => void
  updateTradeState: (newData: TradeFormValuesI) => void
  beginTransacion: (tradeData: any) => any
  getMaxBalance: (data: any) => void
  invertSelectedTokens: () => void
  reduceAmountByPercentage: (percentage: number) => void
  refreshPrices: () => void
}

let updateTradeStateTimeout: NodeJS.Timeout

const TRADE_INITIAL_STATE: TradeProviderState = {
  loading: false,
  tradeState: {
    fromAmount: 0,
    toAmount: 0,
    fromToken: { ...BSC_TOKENS[1], price: 0 },
    toToken: { ...BSC_TOKENS[0], price: 0 }
  },
  tradeConfig: {
    selectedWallets: [],
    showChart: false,
    gasLimit: DEFAULT_GAS_LIMIT,
    gweiCost: DEFAULT_GWEI_PRICE,
    slippage: 0
  },
  updateSelectedWallets: (wallet: WalletT) => {},
  toggleShowChart: () => {},
  onChangeTradeConfig: (gasLimit: string, field: string) => {},
  updateTradeState: (newData: TradeFormValuesI) => {},
  beginTransacion: (tradeData: any) => {},
  getMaxBalance: (data: any) => {},
  invertSelectedTokens: () => {},
  reduceAmountByPercentage: (percentage: number) => {},
  refreshPrices: () => {}
}

export const TradeContext = createContext<TradeProviderState>(TRADE_INITIAL_STATE)

interface TradeProviderProps {
  children: React.ReactNode
}

const TradeProvider = ({ children }: TradeProviderProps) => {
  const [loading, setLoading] = useState<boolean>(TRADE_INITIAL_STATE.loading)
  const [tradeState, setTradeState] = useState<TradeFormValuesI>(TRADE_INITIAL_STATE.tradeState)
  const [tradeConfig, setTradeConfig] = useState<TradeConfigI>(TRADE_INITIAL_STATE.tradeConfig)

  const getTokenPrice = async (tokenAddress: string) => {
    return await axios.post(API_ROUTES.tokens.price.href, { tokenAddress })
  }

  const updateTokenPrices = async (newTradeState: TradeFormValuesI) => {
    setLoading(true)
    const responses = await Promise.all([
      getTokenPrice(newTradeState.fromToken.contract),
      getTokenPrice(newTradeState.toToken.contract)
    ])
    const fromToken = responses[0].data.token
    const toToken = responses[1].data.token
    newTradeState = {
      ...newTradeState,
      fromToken: {
        ...fromToken,
        symbol: fromToken.symbol
      },
      toToken: {
        ...toToken,
        symbol: toToken.symbol
      },
      toAmount: new Intl.NumberFormat().format(
        (fromToken.price * Number(newTradeState.fromAmount)) / toToken.price
      )
    }
    setLoading(false)
    setTradeState(newTradeState)
  }

  const updateTradeState = async (newData: TradeFormValuesI) => {
    let newTradeState = {
      ...tradeState,
      ...newData
    }
    if (updateTradeStateTimeout) clearTimeout(updateTradeStateTimeout)
    updateTradeStateTimeout = setTimeout(() => {
      updateTokenPrices(newTradeState)
    }, 1000)
    newTradeState = {
      ...newTradeState,
      fromToken: {
        ...newTradeState.fromToken,
        symbol: newTradeState.fromToken.symbol
      },
      toToken: {
        ...newTradeState.toToken,
        symbol: newTradeState.toToken.symbol
      }
    }
    setTradeState(newTradeState)
  }

  const toggleShowChart = () =>
    setTradeConfig({
      ...tradeConfig,
      showChart: !tradeConfig.showChart
    })

  const updateSelectedWallets = (incomingWallet: WalletT) => {
    let actualSelectedWallets = tradeConfig.selectedWallets
    let newSelectedWallets: Array<WalletT> = []
    let alreadySelected: boolean = false

    actualSelectedWallets?.forEach((wallet) => {
      if (wallet.privateKey !== incomingWallet.privateKey) {
        newSelectedWallets.push(wallet)
      } else alreadySelected = true
    })
    if (!alreadySelected) newSelectedWallets.push(incomingWallet)

    setTradeConfig({
      ...tradeConfig,
      selectedWallets: newSelectedWallets
    })
  }

  const onChangeTradeConfig = (value: string, field: string) =>
    setTradeConfig({
      ...tradeConfig,
      [field]: Number(value)
    })

  const beginTransacion = async (tradeData: any) => {
    try {
      setLoading(true)
      const response = await axios.post(API_ROUTES.tokens.trade.href, {
        data: encryptData(tradeData)
      })
      setLoading(false)
      return response.data
    } catch (error) {
      const { message } = error as any
      console.log('context catch', error)
      setLoading(false)
      return { ok: false, error: message }
    }
  }

  const invertSelectedTokens = () => {
    const newTradeState = {
      ...tradeState,
      fromToken: tradeState.toToken,
      toToken: tradeState.fromToken
    }
    setTradeState(newTradeState)
    updateTokenPrices(newTradeState)
  }

  const reduceAmountByPercentage = (percentage: number) =>
    setTradeState({
      ...tradeState,
      fromAmount:
        Number(tradeState.fromAmount) - getPercentage(Number(tradeState.fromAmount), percentage)
    })

  const refreshPrices = () => updateTokenPrices(tradeState)

  const getMaxBalance = async (data: any) => {
    try {
      setLoading(true)
      const response = await axios.post(API_ROUTES.tokens.balance.href, {
        data: encryptData(data)
      })
      const { token } = response.data
      updateTokenPrices({
        ...tradeState,
        fromAmount: token.balance
      })
      setLoading(false)
      return
    } catch (error) {
      console.log('error', error)
      setLoading(false)
      return
    }
  }

  // TODO: Check for let customTokens in tradeState
  // useEffect(() => {
  //   const updatePricesInterval = setInterval(() => {
  //     console.log('tradeState', tradeState)
  //     if (!loading) refreshPrices()
  //   }, 10000)
  //   return () => {
  //     clearInterval(updatePricesInterval)
  //   }
  // }, [])

  return (
    <TradeContext.Provider
      value={{
        loading,
        tradeState,
        tradeConfig,
        toggleShowChart,
        onChangeTradeConfig,
        updateSelectedWallets,
        updateTradeState,
        beginTransacion,
        getMaxBalance,
        invertSelectedTokens,
        reduceAmountByPercentage,
        refreshPrices
      }}>
      {children}
    </TradeContext.Provider>
  )
}

export default TradeProvider
