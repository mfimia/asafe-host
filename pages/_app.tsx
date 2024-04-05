import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import Navbar from '@/components/Navbar'

/**
 * 
 * @todo
 * - Provide comprehensive documentation covering architecture, data models, and instructions for devevelopment and deployment
 */

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
