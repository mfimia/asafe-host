import dynamic from 'next/dynamic';
import { Fragment, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';

const Dashboard = dynamic(() => import("remote/dashboard"));

interface ICoin {
  id: string;
  name: string;
  symbol: string;
}

const Row = ({ index, data }: { index: number; data: ICoin[] }) => {
  const coin = data[index];

  return (
    <div className='flex justify-between border-b p-2'>
      <span>{coin.id}</span>
      <span>{coin.name}</span>
      <span>{coin.symbol}</span>
    </div>
  );
};

const DashboardPage = ({ data }: { data: ICoin[] }) => {
  const itemCount = useMemo(() => data.length, [data]);

  return (
    <Fragment>
      <h1>Protected Page</h1>
      <Dashboard />
      <div className="w-full max-w-[600px] border">
        <div className='flex justify-between p-[10px] bg-[#f0f0f0] border-b'>
          <strong>ID</strong>
          <strong>Name</strong>
          <strong>Symbol</strong>
        </div>
        <List
          height={600}
          width="100%"
          itemSize={35}
          itemCount={itemCount}
          itemData={data}
        >
          {Row}
        </List>
      </div>
    </Fragment>
  );
};

export async function getServerSideProps() {
  const url = 'https://api.coingecko.com/api/v3/coins/list';
  const options = { method: 'GET', headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '' } };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Failed to fetch, status: ${res.status}`);
    const data: ICoin[] = await res.json();

    return {
      props: {
        data
      }
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    return {
      props: {
        data: []
      }
    };
  }
}

export default DashboardPage