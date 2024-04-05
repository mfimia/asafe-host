import LoginInfoHeader from '@/components/LoginInfoHeader'
import { Fragment } from 'react'
import Image from 'next/image'
import heroImage from '../public/img/crypto_main.webp'
import Link from 'next/link'

export default function Home() {
  return (
    <Fragment>
      <LoginInfoHeader />
      <main className='container mx-auto mt-20 p-12 flex flex-col items-center justify-center text-twilight100 rounded-lg font-tt'>
        <h1 className='text-3xl text-center font-bold mb-4'>
          Welcome to <span className='text-ultranebula'>Bibot Crypto Dashboard</span>
        </h1>
        <p className='text-lg text-center mb-8'>
          Your one-stop hub for real-time cryptocurrency data and analytics.
        </p>

        <Image
          priority
          src={heroImage}
          alt='Bibot'
          sizes='100vw'
          className='max-w-[400px] rounded-xl md:max-w-[450px] lg:max-w-[500px] xl:max-w-lg'
          style={{ width: '100%', height: 'auto' }}
        />
        <Link href={'/dashboard'} className='w-3/4 max-w-md bg-meganebula p-3 text-center text-2xl font-bold text-nebula1010 transition-all duration-500 hover:shadow-2xl my-4 rounded-lg shadow-ultranebula'>
          Launch Dashboard
        </Link>
      </main>
    </Fragment>
  )
}
