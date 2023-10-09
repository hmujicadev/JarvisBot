import { Transition } from '@headlessui/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ROUTES } from '../../routes'

const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' }
]
const homeItems = [
  {
    image: '/images/trading.png',
    href: ROUTES.trading.href
  },
  {
    image: '/images/presale.png',
    href: ROUTES.presale.href
  }
]

const Home = () => {
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsShowing(true)
    }, 200)
  }, [])
  return (
    <>
      <div className="home-background pt-40 md:pt-10 w-screen h-screen flex items-center justify-center md:justify-start">
        <div className="absolute animate-pulse-slow h-40 w-48 left-0 top-0 md:left-60 md:top-5 p-1 transform hover:scale-105 transition transition-scale ease-in-out duration-300">
          <div className="relative h-40 w-100">
            <Image
              src="/images/logo-texto.png"
              alt="Jarvisbot logo"
              layout="fill"
              objectFit="fill"
            />
          </div>
        </div>
        <div className="absolute h-16 w-16 right-20 md:right-10 top-5 animate-spin-slow hover:scale-105 cursor-pointer">
          <Link href={{ pathname: ROUTES.settings.href }}>
            <a>
              <div className="relative h-16 w-100">
                <Image src="/images/configure.png" alt="settings" layout="fill" objectFit="fill" />
              </div>
            </a>
          </Link>
        </div>
        <div className="flex w-100 md:w-5/12">
          <Transition className="flex flex-col md:flex-row" show={isShowing}>
            {homeItems.map((item) => (
              <div key={item.href} className="relative">
                <Link href={{ pathname: item.href }}>
                  <a>
                    <Transition.Child
                      enter="transition-opacity ease-linear duration-1000"
                      enterFrom="opacity-0"
                      enterTo="opacity-15"
                      leave="transition-opacity ease-linear duration-1000"
                      leaveFrom="opacity-15"
                      leaveTo="opacity-0">
                      <div className="relative cursor-pointer w-72 h-80">
                        <div className="absolute top-2/4 left-1/3 h-4 w-1/3">
                          <div className="relative opacity-20 hover:opacity-50 animate-pulse-slow h-4 w-100">
                            <Image src={item.image} alt="trading" layout="fill" objectFit="fill" />
                          </div>
                        </div>
                        <div className="relative w-100 transform h-80 md:auto animate-pulse-slow opacity-20 hover:rotate-90 transition ease-out duration-700">
                          <Image src="/images/selector.png" alt="" layout="fill" objectFit="fill" />
                        </div>
                      </div>
                    </Transition.Child>
                  </a>
                </Link>
              </div>
            ))}
          </Transition>
        </div>
        <div className="w-20 absolute left-0 bottom-1 opacity-25 invisible md:visible">
          <div className="relative w-100 h-16 w-16">
            <Image src="/images/logo.gif" alt="" layout="fill" objectFit="fill" />
          </div>
        </div>
        <dl className="flex flex-col invisible xl:visible absolute bottom-2 right-2 ">
          {stats.map((item) => (
            <div
              key={item.name}
              className="mb-6 px-6 py-4 bg-gradient-to-r from-green-300 opacity-40 shadow rounded-lg overflow-hidden sm:px-6 transform hover:scale-105 hover:opacity-90">
              <dt className="text-sm font-medium text-black-500 truncate">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}

export default Home
