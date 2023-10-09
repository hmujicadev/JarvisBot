import _ from 'lodash'
import { ethers } from 'ethers'
import { DEX_ROUTERS, URLs } from '../constants'
import ROUTER_PANCAKE_ABI from '../data/router_pancake_ABI.json'
import { ADD_LIQUIDITY_METHOD, PAIR_CREATED_METHOD } from '../constants/methods'
import { getTokensBalance } from './tokens'

interface snipeParamsI {
  wssProvider: string
  tokenToBuy: string
  tokenToSpend: string
  walletPrivateKey: string
  amount: string
  gasLimit: string
  gweiCost: string
  slippage: string
}

export const snipeToken = async (tradeData: any) => {
  const {
    wssProvider,
    tokenToBuy,
    tokenToSpend,
    walletPrivateKey,
    amount,
    gasLimit,
    gweiCost,
    slippage
  }: snipeParamsI = tradeData
  // console.log('SERVICE', {
  //   wssProvider,
  //   tokenToBuy,
  //   tokenToSpend,
  //   walletPrivateKey,
  //   amount,
  //   gasLimit,
  //   gweiCost,
  //   slippage
  // })
  const listeningDeadline = 1639959000
  const amountIn = ethers.utils.parseUnits(amount, 'ether')
  const amountOutMin = ethers.utils.parseUnits(slippage, 'ether')
  const SnipeID = tokenToBuy.toLowerCase().replace('0x', '')

  const provider = new ethers.providers.WebSocketProvider(wssProvider)

  const wallet = ethers.Wallet.fromMnemonic(walletPrivateKey)
  const signerAccount = wallet.connect(provider)
  const nonce = await provider.getTransactionCount(wallet.address, 'latest')

  const router = new ethers.Contract(
    DEX_ROUTERS.pancakeswap.contract, // router address
    ROUTER_PANCAKE_ABI, // router abi
    signerAccount //signer
  )
  provider.removeAllListeners()

  await provider.on('pending', async (tx: any) => {
    console.log('tx', tx)
    try {
      if (listeningDeadline < Date.now()) {
        await provider.getTransaction(tx).then(async function (transaction: any) {
          console.log('getTransaction', transaction)
          if (
            (transaction != null &&
              transaction['data'].includes(PAIR_CREATED_METHOD) &&
              transaction['data'].includes(SnipeID)) ||
            (transaction != null &&
              transaction['data'].includes(ADD_LIQUIDITY_METHOD) &&
              transaction['data'].includes(SnipeID))
          ) {
            console.log('Founded liquidity!')
            const tradeResponse = await router.swapExactTokensForTokens(
              amountIn,
              amountOutMin,
              [tokenToSpend.toLowerCase(), tokenToBuy.toLowerCase()],
              wallet.address,
              Date.now() + 1000 * 60 * 10, // Deadline:  Now timestamp + 10m
              {
                gasLimit: gasLimit,
                gasPrice: ethers.utils.parseUnits(gweiCost, 'gwei'),
                nonce
              }
            )
            const balanceResponse = await getTokensBalance(tokenToBuy, wallet, provider)
            provider.off('pending')
            return {
              ok: true,
              data: {
                txHash: tradeResponse.hash,
                bscscanURL: `${URLs.bsc_scan}tx/${tradeResponse.hash}`,
                token: balanceResponse.token
              }
            }
          }
        })
      } else {
        provider.off('pending')
        console.log('deadline error')
        throw new Error('Deadline reached')
      }
    } catch (e) {
      console.log('main catch')
      provider.removeAllListeners()
      console.log('ERRR', e)
      const { message, code } = e as any
      let error: string = ''

      if (message === 'Stopped!') error = 'Deadline reached'

      return {
        ok: false,
        status: 400,
        error
      }
    }
  })
}

// export const startConnection = (wssProvider) => {
//   const provider = new ethers.providers.WebSocketProvider(wssProvider)

//   let pingTimeout = null
//   let keepAliveInterval = null

//   provider._websocket.on('open', () => {
//     keepAliveInterval = setInterval(() => {
//       logger.debug('Checking if the connection is alive, sending a ping')

//       provider._websocket.ping()

//       // Use `WebSocket#terminate()`, which immediately destroys the connection,
//       // instead of `WebSocket#close()`, which waits for the close timer.
//       // Delay should be equal to the interval at which your server
//       // sends out pings plus a conservative assumption of the latency.
//       pingTimeout = setTimeout(() => {
//         provider._websocket.terminate()
//       }, EXPECTED_PONG_BACK)
//     }, KEEP_ALIVE_CHECK_INTERVAL)

//     // TODO: handle contract listeners setup + indexing
//   })

//   provider._websocket.on('close', () => {
//     logger.error('The websocket connection was closed')
//     clearInterval(keepAliveInterval)
//     clearTimeout(pingTimeout)
//     startConnection()
//   })

//   provider._websocket.on('pong', () => {
//     logger.debug('Received pong, so connection is alive, clearing the timeout')
//     clearInterval(pingTimeout)
//   })
// }
// // Factory way

// const factory = new ethers.Contract(
//   DEX_ROUTERS.pancakeswap.factory,
//   ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
//   signerAccount
// )

// factory.removeAllListeners()

// factory.on('PairCreated', async (token0, token1, pairAddress) => {
//   console.log(`
//       New pair detected
//       =================
//       token0: ${token0}
//       token1: ${token1}
//       pairAddress: ${pairAddress}
//     `)
// })

// const addresses = {
//   WBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
//   factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
//   router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
//   recipient: 'recipient of the profit here'
// }
// //First address of this mnemonic must have enough BNB to pay for tx fess
// const mnemonic = 'your mnemonic here, to send';

// const provider = new ethers.providers.WebSocketProvider('Ankr websocket url to mainnet');
// const wallet = ethers.Wallet.fromMnemonic(mnemonic);
// const account = wallet.connect(provider);
// const factory = new ethers.Contract(
//   addresses.factory,
//   ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
//   account
// );
// const router = new ethers.Contract(
//   addresses.router,
//   [
//     'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
//     'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
//   ],
//   account
// );

// const wbnb = new ethers.Contract(
//   addresses.WBNB,
//   [
//     'function approve(address spender, uint amount) public returns(bool)',
//   ],
//   account
// );

// const init = async () => {
//   const tx = await wbnb.approve(
//     router.address,
//     'replace by amount covering several trades'
//   );
//   const receipt = await tx.wait();
//   console.log('Transaction receipt');
//   console.log(receipt);
// }

// factory.on('PairCreated', async (token0, token1, pairAddress) => {
//   console.log(`
//     New pair detected
//     =================
//     token0: ${token0}
//     token1: ${token1}
//     pairAddress: ${pairAddress}
//   `);

//   //The quote currency needs to be WBNB (we will pay with WBNB)
//   let tokenIn, tokenOut;
//   if(token0 === addresses.WBNB) {
//     tokenIn = token0;
//     tokenOut = token1;
//   }

//   if(token1 == addresses.WBNB) {
//     tokenIn = token1;
//     tokenOut = token0;
//   }

//   //The quote currency is not WBNB
//   if(typeof tokenIn === 'undefined') {
//     return;
//   }

//   //We buy for 0.1 BNB of the new token
//   //ethers was originally created for Ethereum, both also work for BSC
//   //'ether' === 'bnb' on BSC
//   const amountIn = ethers.utils.parseUnits('0.1', 'ether');
//   const amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
//   //Our execution price will be a bit different, we need some flexbility
//   const amountOutMin = amounts[1].sub(amounts[1].div(10));
//   console.log(`
//     Buying new token
//     =================
//     tokenIn: ${amountIn.toString()} ${tokenIn} (WBNB)
//     tokenOut: ${amounOutMin.toString()} ${tokenOut}
//   `);
//   const tx = await router.swapExactTokensForTokens(
//     amountIn,
//     amountOutMin,
//     [tokenIn, tokenOut],
//     addresses.recipient,
//     Date.now() + 1000 * 60 * 10 //10 minutes
//   );
//   const receipt = await tx.wait();
//   console.log('Transaction receipt');
//   console.log(receipt);
// });

// init();
