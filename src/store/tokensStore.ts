import { createStore } from 'react-osh'

// export const APP_STORE_INITIAL_DATA = {
//   wallets: [],
//   provider: {
//     type: 'public'
//   }
// }

export const tokensStore: any = createStore({
  // data: APP_STORE_INITIAL_DATA,
  // setData(newData: JarvisBotLocalStorageT) {
  //   const mergedData = {
  //     ...tokensStore.data,
  //     ...newData
  //   }
  //   tokensStore.data = mergedData
  // },
  // get appData() {
  //   return tokensStore.data
  // },
  greet: 'Hello',
  get greeting() {
    return `${tokensStore.greet} from react-osh`
  }
})
