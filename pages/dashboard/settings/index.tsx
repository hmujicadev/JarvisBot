import { ReactElement } from 'react'
import Head from 'next/head'
import DashboardLayout from '../../../src/components/dashboardLayout'
import Settings from '../../../src/components/Settings/Settings'

const SettingsPage = () => {
  return (
    <div>
      <Head>
        <title>Settings | Jarvisbot</title>
      </Head>
      <Settings />
    </div>
  )
}

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default SettingsPage
