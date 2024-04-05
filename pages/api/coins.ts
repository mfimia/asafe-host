import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"
import { ICoin } from "@/types";
import { ROWS_LIMIT, fetchData, getPageData } from "@/utils";

const COINS_KEY = 'COINS'
const cache = new Map();
const FIVE_MINUTES = 1000 * 60 * 5

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const timestamp = Date.now()
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(400).send({ error: "You must be signed in to view the protected content on this page." })
  }

  try {
    const page = parseInt(req.query.page as string || "1", 10);

    if (cache.has(COINS_KEY)) {
      const { timestamp: latestTimestamp, data: allData, totalPages } = cache.get(COINS_KEY);
      if ((timestamp - latestTimestamp) < FIVE_MINUTES) {
        const data = getPageData(allData, page);
        return res.status(200).json({ data, totalPages });
      }
    }

    const url = 'https://api.coingecko.com/api/v3/coins/list';
    const options = { method: 'GET', headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '' } };

    const response = await fetch(url, options);

    if (!response.ok) throw new Error(`Failed to fetch, status: ${response.status}`);

    const allData: ICoin[] = await fetchData(url, options);
    const data = getPageData(allData, page);
    const totalPages = Math.ceil(allData.length / ROWS_LIMIT);

    cache.set(COINS_KEY, { data: allData, totalPages, timestamp });

    return res.status(200).json({ data, totalPages });
  } catch (error: any) {
    return res.status(500).send({ error: error.message })
  }
}

export default handler