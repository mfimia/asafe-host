import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../public/img/logo_svg_path.svg'
import { useSession, signOut, signIn } from "next-auth/react"

const navLinks = [
  { href: '/dashboard', text: 'Dashboard' },
  { href: '/tools', text: 'Tools' },
]

const Navbar: React.FC = () => {
  const { data: session } = useSession()

  return (
    <nav className='flex w-full items-center justify-between bg-ultranebula p-2 px-8 text-nebula20 font-ubuntu'>
      <Link href='/'>
        <Image src={logo} alt='Bibot_logo' width={100} />
      </Link>
      <ul className='flex space-x-4'>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <li className='border px-3 py-1 rounded-md'>{link.text}</li>
          </Link>
        ))}
        {session
          ? <li onClick={() => signOut()} className='border rounded-md px-3 py-1 cursor-pointer'>Sign out</li>
          : <li onClick={() => signIn()} className='border rounded-md px-3 py-1 cursor-pointer'>Sign in</li>
        }
      </ul>
    </nav>
  )
}

export default Navbar
