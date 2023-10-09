import { ChangeEvent, ReactNode } from 'react'
import { view } from 'react-osh'

interface TradeInputPropsT {
  children?: ReactNode
  label: string
  name: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
  type?: 'number' | 'text'
}
const TradeInput = view(
  ({
    children,
    label,
    name,
    value,
    onChange,
    readOnly = false,
    type = 'number'
  }: TradeInputPropsT) => {
    return (
      <div>
        {label && (
          <label className="text-white text-xs ml-2" htmlFor={name}>
            {label}
          </label>
        )}
        <div className="relative flex p-2 bg-gray-800 rounded-lg h-14 mt-2">
          <div className="flex-0">{children}</div>
          <div className="flex-1">
            <input
              className={`${
                readOnly ? 'cursor-default text-gray-500' : 'cursor-text text-white'
              } w-full py-2 border-none shadow-none font-semibold bg-gray-800 text-xl text-right focus:ring focus:border-gray-800 focus:ring-gray-800`}
              type={type}
              name={name}
              value={value}
              placeholder="0,0"
              readOnly={readOnly}
              onKeyPress={(e) =>
                !readOnly ? (e.key === 'e' || e.key === '-') && e.preventDefault() : null
              }
              onFocus={(e) => e.target.select()}
              onChange={onChange}
              step="any"
            />
          </div>
        </div>
      </div>
    )
  }
)

export default TradeInput
