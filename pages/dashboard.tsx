import dynamic from 'next/dynamic'
import { ComponentType, Fragment } from 'react'

interface IDashboardPageProps {
  data: number[]
}

const Dashboard: ComponentType<IDashboardPageProps> = dynamic(() => import("remote/dashboard"))

const DashboardPage = ({ data }: IDashboardPageProps) => {
  return (
    <Fragment>
      <h1>Protected Page</h1>
      <Dashboard data={data} />
    </Fragment>
  )
}

export async function getServerSideProps() {
  // Fetch data from your API or other sources
  const data = await fetchData();
  return {
    props: {
      data,
    },
  };
}

const fetchData = async () => {
  return [1, 2, 3]
}

export default DashboardPage