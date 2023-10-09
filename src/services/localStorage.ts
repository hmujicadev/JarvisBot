import { APP_STORE_INITIAL_DATA } from '../store/appStore'
import { JarvisBotLocalStorageT } from '../types/global'
import { encryptData, decryptData } from '../utils'

const LOCAL_STORAGE_KEY = 'jarvisbotapp'

export const getLocalStorageData = (): JarvisBotLocalStorageT => {
  const localStorageData = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  const data = localStorageData ? decryptData(localStorageData) : APP_STORE_INITIAL_DATA
  return data
}

export const setLocalStorageData = (data: JarvisBotLocalStorageT) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, encryptData(data))
}

export const clearLocalStorageData = (): void => window.localStorage.removeItem(LOCAL_STORAGE_KEY)
