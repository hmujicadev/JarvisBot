import { formatUnits } from '@ethersproject/units'
import { ethers, Wallet } from 'ethers'
import ERC20_ABI from '../data/erc20_ABI.json'
import { axios } from '../config/axios'
import { DEFAULT_GAS_LIMIT, DEFAULT_GWEI_PRICE, DEX_ROUTERS, URLs } from '../constants'
import { ProviderT } from '../types/global'

export const getAllTokensPrice = async () => {
  const res = await axios.get(`${URLs.ps_v2_api}tokens/`)
  return res.data
}

export const getTokenPrice = async (tokenAddress: string) => {
  const res = await axios.get(`${URLs.ps_v2_api}tokens/${tokenAddress}`)
  return res.data
}

export const getTokensBalance = async (
  tokenAddress: string,
  wallet: ethers.Wallet,
  provider: ethers.providers.JsonRpcProvider
) => {
  // TODO: Implement global function to decide provider to use
  // const wallet = Wallet.fromMnemonic(walletPrivateKey)
  // const provider = new ethers.providers.JsonRpcProvider(providerData.httpsURL)
  const signer = await wallet.connect(provider)
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
  const tokenDecimals = await tokenContract.decimals()
  const tokenSymbol = await tokenContract.symbol()
  const tokenAccountBalance = (await tokenContract.balanceOf(await signer.getAddress())).toString()
  const formatTokenAccountBalance = formatUnits(tokenAccountBalance, tokenDecimals)

  return {
    ok: true,
    token: {
      contract: tokenContract.address,
      symbol: tokenSymbol,
      balance: formatTokenAccountBalance
    }
  }
}
export const getTokensBalanceFromAPI = async (
  tokenAddress: string,
  walletPrivateKeys: Array<string>,
  providerData: ProviderT
) => {
  // TODO: Implement global function to decide provider to use
  const wallet = Wallet.fromMnemonic(walletPrivateKeys[0])
  const provider = new ethers.providers.JsonRpcProvider(providerData.httpsURL)
  const signer = await wallet.connect(provider)
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
  const tokenDecimals = await tokenContract.decimals()
  const tokenSymbol = await tokenContract.symbol()
  const tokenAccountBalance = (await tokenContract.balanceOf(await signer.getAddress())).toString()
  const formatTokenAccountBalance = formatUnits(tokenAccountBalance, tokenDecimals)

  return {
    ok: true,
    token: {
      contract: tokenContract.address,
      symbol: tokenSymbol,
      balance: formatTokenAccountBalance
    }
  }
}

export const approveTokenInPancakeSwap = async (
  tokenToAprove: string,
  wallet: ethers.Wallet,
  provider: ethers.providers.JsonRpcProvider | ethers.providers.WebSocketProvider
) => {
  try {
    const signerAccount = wallet.connect(provider)
    const token = new ethers.Contract(tokenToAprove, ERC20_ABI, signerAccount)
    const allowance = await token.allowance(signerAccount.address, DEX_ROUTERS.pancakeswap.contract)
    const nonce = await provider.getTransactionCount(wallet.address, 'latest')

    // Not allowed to spend
    if (ethers.BigNumber.from(allowance).toString() === '0') {
      const aproveResponse = await token.approve(
        DEX_ROUTERS.pancakeswap.contract,
        ethers.utils.parseUnits('1000.0', 18),
        {
          gasLimit: DEFAULT_GAS_LIMIT.toString(), //100k gas
          gasPrice: ethers.BigNumber.from(
            ethers.utils.parseUnits(DEFAULT_GWEI_PRICE.toString(), 'gwei')
          ), //5gwei
          nonce
        }
      )
      return {
        ok: true,
        ...aproveResponse,
        nonce: aproveResponse.nonce + 1
      }
    }
    return {
      ok: true,
      nonce
    }
  } catch (e) {
    const { message } = e as any

    return {
      ok: false,
      status: 400,
      error: message
    }
  }
}

// const provider = ...; (use ethers.providers.InfuraProvider for a Node app or ethers.providers.Web3Provider(window.ethereum/window.web3) for a React app)
// const contract = new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
// const balance = (await contract.balanceOf((await provider.getSigners())[0].address)).toString();
// Aproves Contract?
// console.log(`Allow Pancakeswap <<<<<------- START-------->>>>>`)
// let abi = ['function approve(address _spender, uint256 _value) public returns (bool success)']
// let contract = new ethers.Contract(INPUT_TOKEN.address, abi, signer)
// let aproveResponse = await contract.approve(PANCAKE_ROUTER, ethers.utils.parseUnits('1000.0', 18), {
//   gasLimit: 100000,
//   gasPrice: 5e9
// })
// console.log(JSON.stringify(aproveResponse))
// console.log(`Allow Pancakeswap <<<<<------- END-------->>>>>`)

//=============================================================================================
//=============================================================================================
//=============================================================================================

// How do i debug or troubleshoot this... I am going broke $0.07 at a time.. LOL

// The code approves WBNB on Pancakeswap and gives a transaction receipt. Then it fails the swapExactTokensForTokens when swapping 0.005 WBNB for BUSD

// The Approval https://bscscan.com/tx/0xc02b45832450e03e4c9e842238fc6ca7d400e9af6287d6fde5f40c973746b7b5

// The Failed Swap https://bscscan.com/tx/0x72db3b1471a4a62d676a0f76097d6bf59533fe450a7d0b7d0423168c7f6e8a8b

// const ethers = require('ethers');

// const addresses = {
//     WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
//     BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
//     factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
//     router: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
//     recipient: '0x4F2200C7E437F92A2bbB03A5c867b379B72F87B0'
//   }

// const privateKey = 'My Privates';
// const mygasPrice = ethers.utils.parseUnits('5', 'gwei');

// const provider = new ethers.providers.WebSocketProvider('wss://muddy-young-frost.bsc.quiknode.pro');
// const wallet = new ethers.Wallet(privateKey);
// const account = wallet.connect(provider);

// const router = new ethers.Contract(
//   addresses.router,
//   [
//     'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
//     'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
//   ],
//   account
// );

// const wbnb1 = new ethers.Contract(
//     addresses.WBNB,
//     [
//       'function approve(address spender, uint amount) public returns(bool)',
//     ],
//     account
//   );

//   console.log(`Before Approve`);
//   const valueToapprove = ethers.utils.parseUnits('0.01', 'ether');
//   const init = async () => {
//     const tx = await wbnb1.approve(
//       router.address,
//       valueToapprove,
//       {
//           gasPrice: mygasPrice,
//           gasLimit: 210000
//       }
//     );
//     console.log(`After Approve`);
//     const receipt = await tx.wait();
//     console.log('Transaction receipt');
//     console.log(receipt);
//   }

//   init();

//   const testtx = async () => {
//   console.log(`after testtx`);

//   let tokenIn = addresses.WBNB , tokenOut = addresses.BUSD;

//   const amountIn = ethers.utils.parseUnits('0.005', 'ether');
//   const amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
//   //Our execution price will be a bit different, we need some flexbility
//   const amountOutMin = amounts[1].sub(amounts[1].div(10));

//   console.log(`
//     Buying new token
//     =================
//     tokenIn: ${amountIn} ${tokenIn} (WBNB)
//     tokenOut: ${amountOutMin} ${tokenOut}
//   `);

// const tx = await router.swapExactTokensForTokens(
//   amountIn,
//   amountOutMin,
//   [tokenIn, tokenOut],
//   addresses.recipient,
//   Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
//   {
//       gasPrice: mygasPrice,
//       gasLimit: 210000
//   }
// );
// console.log(`line 115`);
// const receipt = await tx.wait();
// console.log('Transaction receipt');
// console.log(receipt);
// }
// testtx();
