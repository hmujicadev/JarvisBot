import { ReactElement } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../../src/components/dashboardLayout'
import Presale from '../../../src/components/Presale/Presale'

const PresalePage = () => {
  return (
    <>
      <Head>
        <title>Presale | Jarvisbot</title>
      </Head>
      <Presale />
    </>
  )
}
PresalePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default PresalePage
