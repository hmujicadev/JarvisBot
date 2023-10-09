import _ from 'lodash'
import { ethers } from 'ethers'
import { ProviderT } from '../types/global'
import { approveTokenInPancakeSwap, getTokensBalance } from './tokens'
import { DEX_ROUTERS, URLs } from '../constants'
import ROUTER_PANCAKE_ABI from '../data/router_pancake_ABI.json'
import { decryptData } from '../utils'

export const buyToken = async (
  providerData: ProviderT,
  tokenToBuy: string,
  tokenToSpend: string,
  walletPrivateKeys: Array<string>,
  amount: string,
  slippage: string,
  gasLimit?: string,
  gweiCost?: string
) => {
  // TODO: redo all this but working with more than one wallet
  try {
    const { httpsURL } = providerData
    if (_.isUndefined(httpsURL)) throw new Error('invalid provider')

    const amountIn = ethers.utils.parseUnits(amount, 'ether')
    const amountOutMin = ethers.utils.parseUnits(slippage, 'ether')
    const provider = new ethers.providers.JsonRpcProvider(httpsURL || '')
    // const wsProvider = new ethers.providers.WebSocketProvider(wssURL || '')
    // const provider = rpcProvider || wsProvider
    const wallet = ethers.Wallet.fromMnemonic(walletPrivateKeys[0])
    const signerAccount = wallet.connect(provider)

    const router = new ethers.Contract(
      DEX_ROUTERS.pancakeswap.contract, // router address
      ROUTER_PANCAKE_ABI, // router abi
      signerAccount //signer
    )

    // Await for aprove in router
    const approveResponse = await approveTokenInPancakeSwap(tokenToSpend, wallet, provider)
    const nonce =
      approveResponse.nonce || (await provider.getTransactionCount(wallet.address, 'latest'))
    const tradeResponse = await router.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      // [Spend, Receive], [Sell, buy]
      [tokenToSpend.toLowerCase(), tokenToBuy.toLowerCase()],
      wallet.address,
      // Date.now(), // Deadline:  Now timestamp
      Date.now() + 1000 * 60 * 10, // Deadline:  Now timestamp + 10 mins
      {
        gasLimit: gasLimit,
        gasPrice: ethers.utils.parseUnits(gweiCost || '5', 'gwei'),
        nonce
      }
    )
    provider.removeAllListeners()
    const balanceResponse = await getTokensBalance(tokenToBuy, wallet, provider)

    return {
      ok: true,
      data: {
        txHash: tradeResponse.hash,
        bscscanURL: `${URLs.bsc_scan}tx/${tradeResponse.hash}`,
        token: balanceResponse.token
      }
    }
  } catch (e) {
    const { message, code } = e as any
    let error: string = ''
    console.log('ERRR', e)
    // console.log('ERRRR', message)

    if (code === 'INSUFFICIENT_FUNDS') error = 'Insufficient funds'
    if (message.includes('intrinsic gas too low')) error = 'Gas too low'
    if (message === 'invalid mnemonic') error = 'Invalid wallet private key'
    if (message === 'invalid provider') error = 'Provider is required'

    return {
      ok: false,
      status: 400,
      error
    }
  }
}
