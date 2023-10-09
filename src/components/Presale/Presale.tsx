import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { TradeTokenT } from '../../types/global'
import TradeSelect from '../global/TradeSelect/TradeSelect'
import BSC_TOKENS from '../../data/bscTokens.json'
import { snipeToken } from '../../services/presale'

const wssProvider = 'wss://lingering-spring-sunset.bsc.quiknode.pro/8af50f922bca9fddd2701c27029195ff24c7143e/'
const Presale = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [fromToken, setfromToken] = useState<TradeTokenT>({ ...BSC_TOKENS[1], price: 0 })
  const [targetToken, setTargetToken] = useState<string>(
    '0x8c5921a9563E6d5dDa95cB46b572Bb1Cc9b04a27'
  )

  const handleTokenChange = (newFromToken: TradeTokenT) => setfromToken(newFromToken)

  const handleSubmit = async () => {
    const snipeData = {
      wssProvider,
      tokenToBuy: targetToken,
      tokenToSpend: fromToken.contract,
      walletPrivateKey: 'upper table congress undo rare floor broken control illness else wagon eternal',
      amount: '100',
      gasLimit: '200000',
      gweiCost: '10',
      slippage: '0'
    }

    try {
      setLoading(true)
      const response = await snipeToken(snipeData)
      console.log('response', response)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen overflow-y-auto flex justify-center items-center">
      <div className="container p-5">
        <div className="relative">
          <Transition
            appear
            show={true}
            as={Fragment}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="p-5 rounded-lg grid grid-cols-1 gap-x-8 gap-y-1 bg-jarvis-card w-4/6 mx-auto space-y-3">
              <p className="text-white text-center text-2xl font-semibold">$CWOLF Presale</p>
              <div className="flex space-x-5">
                <div className="space-y-2  w-1/6">
                  <label className="text-white text-xs ml-2" htmlFor={'target'}>
                    From
                  </label>
                  <div className="relative py-2">
                    <TradeSelect
                      selected={fromToken}
                      handleTokenChange={(tokenAddress) => handleTokenChange(tokenAddress)}
                      allowCustom={false}
                    />
                  </div>
                </div>
                <div className="space-y-2 w-5/6">
                  <label className="text-white text-xs ml-2" htmlFor={'targetToken'}>
                    Token contract
                  </label>
                  <div className="relative flex p-2 bg-gray-800 rounded-lg h-14 mt-2">
                    <input
                      className="cursor-text text-white w-full py-2 border-none shadow-none font-semibold bg-gray-800 text-xl text-left focus:ring focus:border-gray-800 focus:ring-gray-800"
                      type="text"
                      name="targetToken"
                      value={targetToken}
                      placeholder="0x..."
                      onKeyPress={(e) => e.key === 'e' || e.key === '-'}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => setTargetToken(e.currentTarget.value)}
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={loading}
                onClick={handleSubmit}
                className={
                  'bg-jarvis-300 shadow-jarvis-300/50 shadow-lg px-2 py-4 text-2xl text-white w-full text-center cursor-pointer hover:bg-opacity-80 transform transition-colors disabled:bg-gray-600 disabled:text-white/50 disabled:cursor-default disabled:shadow-none rounded-md'
                }>
                {loading ? 'Looking for liquidity' : 'Snipe!'}
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  )
}

export default Presale
