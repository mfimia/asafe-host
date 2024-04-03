import dynamic from 'next/dynamic'

const Dashboard = dynamic(() => import("remote/dashboard"))

export default function Home() {
  return (
    <main>
      <h1>
        Main app
      </h1>
      <Dashboard />
    </main>
  )
}
