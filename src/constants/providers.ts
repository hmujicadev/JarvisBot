const BSC_HTTPS1 = 'https://bsc-dataseed.binance.org/'
const BSC_HTTPS2 = 'https://bsc-dataseed1.defibit.io/'
const BSC_HTTPS3 = 'https://bsc-dataseed1.ninicoin.io/'

const BSC_WSS = 'wss://bsc-ws-node.nariox.org:443'

interface IProviders {
  https: Array<string>
  wss: Array<string>
}

export const BSC_PUBLIC_PROVIDERS: IProviders = {
  https: [BSC_HTTPS1, BSC_HTTPS2, BSC_HTTPS3],
  wss: [BSC_WSS]
}
