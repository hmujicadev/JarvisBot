export type WalletT = {
  alias: string
  privateKey: string
}

export type WalletValues = {
  wallets: Array<WalletT>
}

export type ProviderT = {
  type: 'public' | 'private'
  httpsURL?: string
  wssURL?: string
}

export type JarvisBotLocalStorageT = {
  wallets: Array<WalletT>
  provider: ProviderT
}

export type InitialTokenTradeT = {
  fromToken: TradeTokenT
  toToken: TradeTokenT
}

// export type TradeFormKeysI =
//   | 'fromToken'
//   | 'toToken'
//   | 'buyFromAmount'
//   | 'buyToAmount'
//   | 'sellFromAmount'
//   | 'sellToAmount'

export type TradeFormKeysI = 'fromToken' | 'toToken' | 'fromAmount' | 'toAmount'

export interface TradeFormValuesI {
  [key: string]: any
}

export type TradeTokenT = {
  price: number
  price_BNB?: number
  contract: string
  symbol?: string
  name?: string
  imported?: boolean
}

export interface TradeConfigI {
  showChart: boolean
  selectedWallets: Array<WalletT>
  gasLimit: number
  gweiCost: number
  slippage: number
}
