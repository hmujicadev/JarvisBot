import { ReactElement } from 'react'
import DashboardLayout from '../../../src/components/dashboardLayout'

const SniperPage = () => {
  return <div>Sniper</div>
}

SniperPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default SniperPage
