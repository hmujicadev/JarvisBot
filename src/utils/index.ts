import crypto from 'crypto-js'
import _ from 'lodash'
import { toast, ToastOptions } from 'react-toastify'

export const encryptData = (data: string | any, privateMode = false): string => {
  const secret = privateMode ? process.env.PRIVATE_SECRET : process.env.NEXT_PUBLIC_PUBLIC_SECRET
  if (_.isUndefined(secret)) return data.toString()
  if (typeof data === 'string') return crypto.AES.encrypt(JSON.stringify(data), secret).toString()
  return crypto.AES.encrypt(JSON.stringify(data), secret).toString()
}

export const decryptData = (encryptedData: string, privateMode = false): any => {
  const secret = privateMode ? process.env.PRIVATE_SECRET : process.env.NEXT_PUBLIC_PUBLIC_SECRET
  if (_.isUndefined(secret)) return encryptedData
  var bytes = crypto.AES.decrypt(encryptedData, secret)
  var decryptedData = bytes.toString(crypto.enc.Utf8)
  return decryptedData
}

export const displayNotification = (Component: JSX.Element, options?: ToastOptions) => {
  toast(Component, {
    closeButton: false,
    ...options
  })
}

export const cleanTokenSymbol = (symbol: string) =>
  symbol.toLowerCase() === 'wbnb' ? symbol.replace('W', '') : symbol

export const getPercentage = (amount: number, percentage: number) =>
  amount * ((100 - percentage) / 100)
// slippage: (toAmount * ((100 - Number(slippage)) / 100)).toString(),
