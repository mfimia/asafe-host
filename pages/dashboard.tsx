import { ICoin } from '@/types';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Dashboard = dynamic(() => import("remote/dashboard"));

/**
 * 
 * @todo 
 * **Optimizations**
 * - Optimize the application for mobile performance using Google Lighthouse metrics
 * - Implement SSR for critical pages to improve initial loading time
 * - Ensure efficient resource loading using strategies like pre-fetching or pre-loading
 */

const DashboardPage = () => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [data, setData] = useState<ICoin[]>([])

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const res = await fetch(`/api/coins?page=${page}`)

        if (res.status !== 200) {
          const { error } = await res.json()
          alert(error)
        }

        const { data, totalPages }: { data: ICoin[], totalPages: number } = await res.json()

        setData(data)
        setTotalPages(totalPages)
      } catch (error) {
        alert(error)
      }
    }

    fetchCoinData()
  }, [page])

  return (
    <main className='p-4 m-4'>
      <Dashboard />
      <h3 className='text-xl font-bold text-center my-2 text-ultranebula'>🔥 Hottest coins</h3>
      <div className='mx-auto border border-space80 w-fit p-4 bg-stardust40 rounded-lg sm:min-w-[400px] sm:min-h-[340px]'>
        <table className='table-auto w-full h-full'>
          <thead className='text-space100 bg-space60 bg-opacity-60'>
            <tr>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Symbol</th>
            </tr>
          </thead>
          <tbody className='text-space100 relative'>
            {data.map(coin => (
              <tr key={coin.id}>
                <td className='border px-4 py-2'>{coin.id}</td>
                <td className='border px-4 py-2'>{coin.name}</td>
                <td className='border px-4 py-2'>{coin.symbol}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex justify-between mt-4'>
          <button className='px-4 py-2 bg-ultranebula text-space100 rounded hover:bg-supernebula disabled:opacity-50' onClick={() => setPage(Math.max(page - 1, 1))} disabled={page <= 1}>
            Previous
          </button>
          <span className='text-space100'>Page {page} of {totalPages}</span>
          <button className='px-4 py-2 bg-ultranebula text-space100 rounded hover:bg-supernebula disabled:opacity-50' onClick={() => setPage(Math.min(page + 1, totalPages))} disabled={page >= totalPages}>
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage