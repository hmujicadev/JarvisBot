import { useState, useRef, useEffect, ChangeEvent } from 'react'
import Image from 'next/image'

import { API_ROUTES } from '../../../routes'
import { axios } from '../../../config/axios'
import { TradeTokenT } from '../../../types/global'
import TradeSelectDropdown from './TradeSelectDropdown/TradeSelectDropdown'

interface TradeSelectPropsT {
  label?: string
  selected: TradeTokenT
  handleTokenChange: (tokenAddress: TradeTokenT) => void
  allowCustom?: boolean
}

export type SelectedCustomTokenT = {
  value: string
  isValid: boolean
}

let inputChangeTimeout: NodeJS.Timeout

const TradeSelect = ({ selected, handleTokenChange, allowCustom = true }: TradeSelectPropsT) => {
  const ref = useRef<any>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [customToken, setCustomToken] = useState<SelectedCustomTokenT>({
    isValid: false,
    value: ''
  })

  const selectTokenItem = async (newSelected: TradeTokenT) => {
    await checkToken(newSelected.contract, false)
    setCustomToken({
      isValid: true,
      value: ''
    })
  }

  const checkToken = async (tokenAddress: string, imported = true) => {
    const response = await axios.post(API_ROUTES.tokens.price.href, { tokenAddress })
    if (response.data.ok) {
      setCustomToken({
        isValid: true,
        value: tokenAddress
      })
      handleTokenChange({
        ...response.data.token,
        imported
      })
      setIsOpen(false)
      return
    }
    setCustomToken({
      ...customToken,
      isValid: false
    })
  }

  const handleCustomTokenChange = (selectedOption: string) => {
    setCustomToken({
      ...customToken,
      value: selectedOption
    })
    if (inputChangeTimeout) clearTimeout(inputChangeTimeout)
    inputChangeTimeout = setTimeout(() => {
      if (selectedOption && selectedOption.includes('0x') && 42 === selectedOption.length) {
        checkToken(selectedOption)
      }
    }, 300)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current)
        if (isOpen && ref.current && !ref.current?.contains(e.target)) {
          setIsOpen(false)
        }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isOpen])

  return (
    <div className="w-full">
      <button
        type="button"
        className="relative flex items-center justify-around w-full py-1 px-2 text-center bg-gray-600 text-white rounded shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 sm:text-sm cursor-pointer hover:bg-gray-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}>
        <span className="relative w-6 h-6 ">
          <Image
            src={
              selected.imported
                ? '/images/tokens/notokenimage.svg'
                : `https://pancakeswap.finance/images/tokens/${selected.contract}.png`
            }
            alt="logo"
            layout="fill"
            objectFit="fill"
            className="text-white"
          />
        </span>
        <span className="ml-2 text-lg truncate">{selected.symbol}</span>
      </button>
      <div ref={ref}>
        <TradeSelectDropdown
          isOpen={isOpen}
          customToken={customToken}
          selected={selected}
          selectTokenItem={selectTokenItem}
          handleCustomTokenChange={handleCustomTokenChange}
          allowCustom={allowCustom}
        />
      </div>
    </div>
  )
}

export default TradeSelect
