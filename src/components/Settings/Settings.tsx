import { createElement } from 'react'
import { Tab } from '@headlessui/react'
import ProviderSettings from './ProviderSettings/ProviderSettings'
import WalletSettings from './WalletSettings/WalletSettings'

const setting_tabs = [
  { id: 1, name: 'Wallets', component: WalletSettings },
  { id: 2, name: 'Providers', component: ProviderSettings }
]

const Settings = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
      <div className="pt-3">
        <div className="px-4 sm:px-6 md:px-0">
          <h1 className="text-3xl font-bold text-jarvis-primary">Settings</h1>
        </div>
        <div className="pt-4">
          <div className="w-full px-2">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl">
                {setting_tabs.map(({ name }) => (
                  <Tab
                    key={name}
                    className={({ selected }) => `                          
                          ${
                            selected
                              ? 'border-jarvis-primary text-jarvis-primary bg-gray-900 rounded-t-lg'
                              : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-300'
                          } whitespace-nowrap py-4 px-5 border-b-2 font-medium text-sm`}>
                    {name}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="w-full">
                {setting_tabs.map(({ id, component }) => (
                  <Tab.Panel key={id} className="p-8 rounded-md bg-gray-900">
                    {createElement(component, {})}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
