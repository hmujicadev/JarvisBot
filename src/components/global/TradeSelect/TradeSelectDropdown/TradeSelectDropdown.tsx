import { Fragment, Ref } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import BSC_TOKENS from '../../../../data/bscTokens.json'
import { TradeTokenT } from '../../../../types/global'
import { SelectedCustomTokenT } from '../TradeSelect'

interface TradeSelectDropdownIProps {
  isOpen: boolean
  selected: TradeTokenT
  customToken: SelectedCustomTokenT
  selectTokenItem: (newSelected: TradeTokenT) => void
  handleCustomTokenChange: (token: string) => void
  allowCustom?: boolean
}

const TradeSelectDropdown = ({
  isOpen,
  selected,
  selectTokenItem,
  handleCustomTokenChange,
  customToken,
  allowCustom = true
}: TradeSelectDropdownIProps) => {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0">
      <div className="absolute left-0 top-full w-full bg-gray-800 rounded-md z-10 shadow-lg shadow-gray-800/90">
        <div>
          <span className="text-xs text-white px-3">Select a token</span>
        </div>
        <div className="relative flex flex-wrap space-x-2 px-2">
          {BSC_TOKENS.map((token) => (
            <div
              key={token.name}
              className={`${
                selected.name === token.name ? 'bg-gray-700' : ''
              } text-gray-300 rounded focus:text-white hover:bg-gray-700 cursor-pointer select-none relative py-2 px-2 mb-1 flex items-center justify-around transition-colors`}
              onClick={() => selectTokenItem({ ...token, price: 0 })}
              title={token.contract}>
              <>
                <span className="relative w-6 h-6">
                  <Image
                    src={`https://pancakeswap.finance/images/tokens/${token.contract}.png`}
                    alt={`${token.symbol}-logo`}
                    layout="fill"
                    objectFit="fill"
                  />
                </span>
                <span className="font-normal focus:font-medium ml-3 truncate">{token.symbol}</span>
              </>
            </div>
          ))}
        </div>
        {allowCustom && (
          <div className="p-3 relative">
            <input
              onClick={(e) => e.preventDefault()}
              onChange={(e) => handleCustomTokenChange(e.currentTarget.value)}
              className={`${
                !customToken.isValid
                  ? 'border-red-500 focus:border-red-600 '
                  : 'border-gray-700 focus:border-gray-800 '
              } w-full p-2 pr-7 text-white rounded bg-gray-800 text-sm font-light  focus:outline-0 ring-inset focus:ring-0 border-2 transition-colors`}
              placeholder="Search token"
              value={customToken.value}
            />
            {/* <div className="relative w-100 h-16 w-16 opacity-25">
TODO: Add loader?
  <Image src="/images/logo.gif" alt="" layout="fill" objectFit="fill" />
</div> */}
          </div>
        )}
      </div>
    </Transition>
  )
}

export default TradeSelectDropdown
