import Image from 'next/image'
import { Inter } from 'next/font/google'
import Carousel from '@/components/Carousel'
import data from '@/data.json';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className=' h-screen flex items-center justify-center'>
      <Carousel data={data} />
    </main>
  )
}
