import dynamic from 'next/dynamic'
import { Fragment } from 'react'

const Dashboard = dynamic(() => import("remote/dashboard"))

const DashboardPage = () => {
  return (
    <Fragment>
      <h1>Protected Page</h1>
      <Dashboard />
    </Fragment>
  )
}

export default DashboardPage