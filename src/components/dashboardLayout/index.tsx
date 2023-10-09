import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Header from './header'
import Body from './body'

import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface DashboardLayoutProps {
  children: ReactNode
}

const Aside = dynamic(() => import('./aside'), { ssr: false })

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeMobileMenuOpen = (): void => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* <Header />
      <Aside/>
      <Body>{children}</Body> */}

      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="h-screen overflow-hidden flex">
        <Aside mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={closeMobileMenuOpen} />

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header classNames={classNames} setMobileMenuOpen={closeMobileMenuOpen}></Header>
          {/* Main */}
          <Body>{children}</Body>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
