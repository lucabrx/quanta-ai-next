import { Navbar } from '@/components/navbar'
import Footer from '@/components/footer'
import { type ReactNode } from 'react'
import {auth} from "@clerk/nextjs";

export default async function Layout({ children }: { children: ReactNode }) {
    const {userId} = auth()

    return (
    <>
      <Navbar userId = {userId} />
      {children}
      <Footer />
    </>
  )
}
