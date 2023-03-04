import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import TaskList from "@/components/TaskList";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>

          <TaskList/>
    </>
  )
}
