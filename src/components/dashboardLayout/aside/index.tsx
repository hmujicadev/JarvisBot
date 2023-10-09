import React, { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROUTES, ROUTES_ARRAY } from '../../../routes'
import { Dialog, Transition } from '@headlessui/react'
import { CogIcon, HomeIcon, LightningBoltIcon, ViewGridIcon, XIcon } from '@heroicons/react/outline'

interface AsideProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: () => void
}

const Aside = ({ mobileMenuOpen, setMobileMenuOpen }: AsideProps) => {
  const router = useRouter()
  return (
    <>
      {/* Narrow sidebar */}
      <div className="hidden w-16 bg-gray-900 overflow-y-auto md:block">
        <div className="w-full py-2 flex flex-col items-center">
          <div className="flex-shrink-0 flex items-center mb-2">
            <Link href={ROUTES.home.href}>
              <a>
                <div className="relative animate-pulse-slow cursor-pointer">
                  <Image src="/images/logo-texto.png" alt="Jarvis" height={40} width={42} />
                </div>
              </a>
            </Link>
          </div>
          <div className="flex-1 w-full px-2 space-y-1">
            {ROUTES_ARRAY.map(
              (route) =>
                route.showInDasboard && (
                  <Link key={route.title} href={route.href}>
                    <a
                      className={`${
                        router.asPath === route.href ? 'bg-gray-800 ' : ' hover:bg-gray-800 '
                      } text-jarvis-primary group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium cursor-pointer`}
                      aria-current={router.asPath === route.href ? 'page' : undefined}>
                      {route.icon && <route.icon className="h-6 w-6" aria-hidden="true" />}
                      <span className="mt-2">{route.title}</span>
                    </a>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <div className="relative max-w-xs w-full bg-gray-800 pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={setMobileMenuOpen}>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                {/* <div className="flex-shrink-0 px-4 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                    alt="Workflow"
                  />
                </div> */}
                <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {ROUTES_ARRAY.map(
                        (route) =>
                          route.showInDasboard && (
                            <a
                              key={route.title}
                              href={route.href}
                              className={`                            
                            ${
                              router.asPath === route.href
                                ? 'bg-indigo-800 text-white'
                                : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'
                            } group py-2 px-3 rounded-md flex items-center text-sm font-medium`}
                              aria-current={router.asPath === route.href ? 'page' : undefined}>
                              {route.icon && (
                                <route.icon
                                  className={`${
                                    router.asPath === route.href
                                      ? 'text-white'
                                      : 'text-indigo-300 group-hover:text-white'
                                  }mr-3 h-6 w-6`}
                                  aria-hidden="true"
                                />
                              )}
                              <span>{route.title}</span>
                            </a>
                          )
                      )}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Aside
