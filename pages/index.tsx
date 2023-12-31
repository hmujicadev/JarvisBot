import type { NextPage } from 'next'
import { view } from 'react-osh'
import Head from 'next/head'
import Home from '../src/components/Home'

const HomePage: NextPage = view(() => {
  return (
    <div className="flex justify-center align-items-center w-full">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div
        style={{
          width: '510px',
          height: '395px',
          overflow: 'hidden',
          position: 'relative'
        }}>
        <iframe
          className="chartie"
          loading="lazy"
          width="745px"
          height="400px"
          style={{
            overflow: 'hidden',
            position: 'absolute',
            top: '-180px',
            left: '0',
            width: '510px',
            height: '630px'
          }}
          src="https://charts.bogged.finance/?token=0xd44fd09d74cd13838f137b590497595d6b3feea4"
        />
      </div> */}
      <Home />
    </div>
  )
})

export default HomePage
