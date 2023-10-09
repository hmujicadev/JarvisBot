import { view } from 'react-osh'
import { RadioGroup, Transition } from '@headlessui/react'
import { appStore } from '../../../../store/appStore'
import { useEffect, useState } from 'react'
import { BSC_PUBLIC_PROVIDERS } from '../../../../constants/providers'
import Notification from '../../../global/Notification/Notification'
import { displayNotification } from '../../../../utils'

interface PublicProviderSettingsIProps {
  show: boolean
}

let inputChangeTimeout: NodeJS.Timeout

const PublicProviderSettings = view(({ show }: PublicProviderSettingsIProps) => {
  const [selected, setSelected] = useState<string>()
  const handlePublicProviderChange = (selectedOption: string) => {
    setSelected(selectedOption)
    if (inputChangeTimeout) clearTimeout(inputChangeTimeout)
    inputChangeTimeout = setTimeout(() => {
      appStore.setData({
        provider: {
          type: 'public',
          httpsURL: selectedOption,
          wssURL: BSC_PUBLIC_PROVIDERS.wss[0]
        }
      })
      displayNotification(<Notification text="Saved" type="info" />, { type: 'info' })
    }, 300)
  }

  useEffect(() => {
    const appData = appStore.appData
    if (
      appData.provider.type === 'public' &&
      appData.provider.httpsURL &&
      appData.provider.wssURL
    ) {
      setSelected(appData.provider.httpsURL)
      return
    }
  }, [])
  return (
    <Transition
      show={show}
      appear={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-50"
      leaveFrom="opacity-100"
      leaveTo="opacity-0">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg leading-6 font-medium text-jarvis-primary">HTTPS provider:</h3>
        </div>
        <div>
          <RadioGroup value={selected} onChange={handlePublicProviderChange}>
            <RadioGroup.Label className="sr-only">Public provider</RadioGroup.Label>
            <div className="bg-transparent rounded-md -space-y-px">
              {BSC_PUBLIC_PROVIDERS.https.map((providerURL, providerIdx) => (
                <RadioGroup.Option
                  key={providerURL}
                  value={providerURL}
                  className={({ checked }) =>
                    `${providerIdx === 0 ? 'rounded-tl-md rounded-tr-md' : ''} ${
                      providerIdx === BSC_PUBLIC_PROVIDERS.https.length - 1
                        ? 'rounded-bl-md rounded-br-md'
                        : ''
                    } ${
                      checked
                        ? 'bg-jarvis-100 bg-opacity-0 border-jarvis-100 z-10'
                        : 'border-gray-600'
                    } relative border p-4 flex cursor-pointer focus:outline-none`
                  }>
                  {({ active, checked }) => (
                    <>
                      <span
                        className={`${
                          checked
                            ? 'bg-jarvis-100 border-transparent'
                            : 'bg-gray-300 border-gray-300'
                        } ${
                          active ? 'ring-2 ring-offset-2 ring-jarvis-500' : ''
                        } h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center`}
                        aria-hidden="true">
                        <span className="rounded-full bg-gray-300 w-1.5 h-1.5" />
                      </span>
                      <div className="ml-3 flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className={`${
                            checked ? 'text-jarvis-200' : 'text-gray-200'
                          } block text-sm font-medium`}>
                          {`HTTPS_PUBLIC_PROVIDER_${providerIdx + 1}`}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`${
                            checked ? 'text-jarvis-600' : 'text-gray-500'
                          } block text-sm`}>
                          {providerURL}
                        </RadioGroup.Description>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div>
          <h3 className="text-lg leading-6 font-medium text-jarvis-primary">WSS provider:</h3>
        </div>
        <div>
          <input
            readOnly
            type="text"
            className="border-gray-300 flex-1 min-w-0 block w-full px-3 py-2 rounded-md shadow-sm outline-none sm:text-sm bg-transparent text-white focus:outline-none focus:ring-opacity-0	 focus:border-gray-300"
            value={BSC_PUBLIC_PROVIDERS.wss[0]}
          />
        </div>
      </div>
    </Transition>
  )
})

export default PublicProviderSettings
