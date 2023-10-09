import { ReactElement } from 'react'
import DashboardLayout from '../../src/components/dashboardLayout'

const DashboardPage = () => {
  return <div>dashboard Home</div>
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <div>{page}</div>
    </DashboardLayout>
  )
}

export default DashboardPage
