import { createStore } from 'react-osh'
import { JarvisBotLocalStorageT, WalletT } from '../types/global'

export const APP_STORE_INITIAL_DATA: JarvisBotLocalStorageT = {
  wallets: <Array<WalletT>>[],
  provider: {
    type: 'public'
  }
}

export const appStore: any = createStore({
  data: APP_STORE_INITIAL_DATA,
  setData(newData: JarvisBotLocalStorageT) {
    const mergedData = {
      ...appStore.data,
      ...newData
    }
    appStore.data = mergedData
  },
  get appData() {
    return appStore.data
  }
})
