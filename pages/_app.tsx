import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

/**
 * 
 * @todo
 * - Write E2E tests with Cypress
 * - Provide comprehensive documentation covering architecture, data models, and instructions for devevelopment and deployment
 */

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
