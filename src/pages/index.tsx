import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Menu from '@/components/menu'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter()

  interface OnCardClickProps {
    urlPath: string;
  }

  function onCardClickHandler({ urlPath }: OnCardClickProps) {
    router.push(urlPath)
  }

  return (
    <>
      <Head>
        <title>POS APP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className="row row-cols-1 row-cols-md-2">
          <Menu imageUrl='/menu.png'
            title='Category'
            urlPath='/pos/category' onCardClick={onCardClickHandler} />
          <Menu imageUrl='/menu.png'
            title='Variant'
            urlPath='/pos/variant' onCardClick={onCardClickHandler} />
          <Menu imageUrl='/menu.png'
            title='Product'
            urlPath='/pos/product' onCardClick={onCardClickHandler} />
          <Menu imageUrl='/menu.png'
            title='Order'
            urlPath='/pos/order' onCardClick={onCardClickHandler} />
        </div>

      </main>
    </>
  )
}
