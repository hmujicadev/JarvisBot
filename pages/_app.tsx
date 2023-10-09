import { ReactElement, ReactNode, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { appStore } from '../src/store/appStore'
import {
  clearLocalStorageData,
  getLocalStorageData,
  setLocalStorageData
} from '../src/services/localStorage'

import 'react-toastify/dist/ReactToastify.css'
import '../src/styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const saveInLocalStorageBeforeLeave = () => {
  setLocalStorageData(appStore.appData)
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  if (process.browser) {
    window.onbeforeunload = () => {
      saveInLocalStorageBeforeLeave()
    }
  }
  // Load data from localStorage and dumped in appStore only the first render
  useEffect(() => {
    appStore.setData(getLocalStorageData())
  }, [])

  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
      <Component {...pageProps} />
      <ToastContainer theme="dark" />
    </>
  )
}
