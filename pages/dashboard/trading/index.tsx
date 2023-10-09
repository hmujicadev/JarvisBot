import { ReactElement } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../../src/components/dashboardLayout'
import Trading from '../../../src/components/Trading/Trading'

const TradingPage = () => {
  return (
    <>
      <Head>
        <title>Trading | Jarvisbot</title>
      </Head>
      <Trading />
    </>
  )
}

TradingPage.getLayout = function getLayout(TradingPage: ReactElement) {
  return <DashboardLayout>{TradingPage}</DashboardLayout>
}

export default TradingPage
