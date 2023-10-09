export const DEFAULT_GAS_LIMIT = 200000
export const DEFAULT_GWEI_PRICE = 5

interface ITokenItem {
  [key: string]: {
    contract: string
    name: string
    logo?: string
  }
}
interface IDexTokenItem extends ITokenItem {
  [key: string]: {
    contract: string
    name: string
    logo?: string
    factory: string
  }
}

export const TOKENS: ITokenItem = {
  BNB: {
    contract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    name: 'bnb'
  },
  BUSD: {
    contract: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    name: 'busd'
  },
  WBNB: {
    contract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    name: 'Wrapped BNB'
  },
  CAKE: {
    contract: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    name: 'PancakeSwap token'
  },
  USDT: {
    contract: '0x55d398326f99059fF775485246999027B3197955',
    name: 'Tether USD'
  }
}

export const URLs = {
  bsc_scan: 'https://bscscan.com/',
  ps_v2_api: 'https://api.pancakeswap.info/api/v2/'
}

export const DEX_ROUTERS: IDexTokenItem = {
  pancakeswap: {
    name: 'PancakeSwap',
    contract: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
  },
  apeswap: {
    name: 'ApeSwap',
    contract: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    factory: ''
  }
}
