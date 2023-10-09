import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { appStore } from '../../../store/appStore'
import PrivateProviderSettings from './PrivateProviderSettings/PrivateProviderSettings'
import PublicProviderSettings from './PublicProviderSettings/PublicProviderSettings'

const ProviderSettings = () => {
  const [privateProvider, setPrivateProvider] = useState(false)

  const handleProviderChange = () => {
    setPrivateProvider(!privateProvider)
  }

  useEffect(() => {
    const providerData = appStore.appData.provider
    setPrivateProvider(providerData.type == 'private')
  }, [])

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-lg leading-6 font-medium text-jarvis-primary">Provider</h3>
          <p className="mt-1 max-w-2xl text-sm text-jarvis-secondary">
            Select which type of provider use:
          </p>
        </div>
        <div className="h-10 flex items-center space-x-6">
          <span
            className={`${
              !privateProvider ? 'text-jarvis-primary' : 'text-gray-200'
            } text-lg leading-6 font-medium `}>
            Public
          </span>
          <Switch
            checked={privateProvider}
            onChange={handleProviderChange}
            className={`${
              privateProvider ? 'bg-jarvis-primary' : 'bg-jarvis-900'
            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jarvis-primary`}>
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                privateProvider ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
            />
          </Switch>
          <span
            className={`${
              privateProvider ? 'text-jarvis-primary' : 'text-gray-200'
            } text-lg leading-6 font-medium`}>
            Private
          </span>
        </div>
      </div>
      {privateProvider ? (
        <PrivateProviderSettings show={privateProvider} />
      ) : (
        <PublicProviderSettings show={!privateProvider} />
      )}
    </div>
  )
}

export default ProviderSettings
