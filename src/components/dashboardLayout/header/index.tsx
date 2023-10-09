import { capitalize } from 'lodash'
import { MenuAlt2Icon, PlusSmIcon } from '@heroicons/react/outline'
import { appStore } from '../../../store/appStore'
import { view } from 'react-osh'

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' }
]

const Header = view(({ setMobileMenuOpen, classNames }: any) => {
  return (
    <>
      <header className="w-full">
        <div className="relative z-10 flex-shrink-0 h-10 bg-gray-900 shadow-sm flex">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-end px-4 sm:px-6">
            <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
              <span className="text-jarvis-primary">
                <span className="text-gray-500">Provider:</span>
                {` ${capitalize(appStore.appData.provider.type)}`}
              </span>
              {/* Profile dropdown */}
              {/* <Menu as="div" className="relative flex-shrink-0">
                <div>
                  <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}>
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu> */}

              {/* <button
                type="button"
                className="flex bg-green-400 p-1 rounded-full items-center justify-center text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Add file</span>
              </button> */}
            </div>
          </div>
        </div>
      </header>
    </>
  )
})

export default Header
