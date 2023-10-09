import _ from 'lodash'
import { useEffect, useState } from 'react'
import { view } from 'react-osh'
import { Transition } from '@headlessui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { appStore } from '../../../../store/appStore'
// import { axios } from '../../../../config/axios'
// import { API_ROUTES } from '../../../../routes'
import Notification from '../../../global/Notification/Notification'
import { displayNotification } from '../../../../utils'

interface PrivateProviderSettingsIProps {
  show: boolean
}

type PrivateProviderInputsT = {
  httpsURL: string
  wssURL: string
}

type inputsDataItemT = {
  id: 'httpsURL' | 'wssURL'
  label: string
  inputLabel: string
  placeholder: string
}

const inputsData: Array<inputsDataItemT> = [
  {
    id: 'httpsURL',
    label: 'HTTPS provider URL',
    inputLabel: 'HTTPS',
    placeholder: 'https://your-node-https-url/'
  },
  {
    id: 'wssURL',
    label: 'WebSocket provider URL',
    inputLabel: 'WSS',
    placeholder: 'wss://your-node-wss-url/'
  }
]

// let inputChangeTimeout: NodeJS.Timeout

// TODO: Validate providers or control in trade screen

const PrivateProviderSettings = view(({ show }: PrivateProviderSettingsIProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  // const [areValidProviders, setAreValidProviders] = useState({
  //   httpsURL: false,
  //   wssURL: false
  // })
  const {
    register,
    // watch,
    setValue,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<PrivateProviderInputsT>({
    mode: 'all'
  })
  // const watchWSSURL = watch('wssURL')
  // const watchHTTPSURL = watch('httpsURL')

  const onSubmit: SubmitHandler<PrivateProviderInputsT> = ({
    httpsURL,
    wssURL
  }: PrivateProviderInputsT) => {
    setLoading(true)
    // if (areValidProviders.httpsURL && areValidProviders.wssURL) {
    appStore.setData({
      provider: {
        type: 'private',
        httpsURL,
        wssURL
      }
    })
    displayNotification(<Notification text="Saved" type="info" />, { type: 'info' })
    setLoading(false)
    // }
  }

  // const checkNode = async (providerType: 'httpsURL' | 'wssURL', providerURL: string) => {
  //   const response = await axios.post(API_ROUTES.providers.href, {
  //     providerURL:
  //       providerURL.substring(providerURL.length - 2, providerURL.length - 1) === '/'
  //         ? providerURL.substring(0, providerURL.length - 1)
  //         : providerURL
  //   })
  //   console.log('response', response)
  //   setAreValidProviders({
  //     ...areValidProviders,
  //     [providerType]: response.data.ok
  //   })
  // }

  // useEffect(() => {
  //   if (inputChangeTimeout) clearTimeout(inputChangeTimeout)
  //   inputChangeTimeout = setTimeout(() => {
  //     if (watchHTTPSURL && watchHTTPSURL != appStore.appData.provider.httpsURL)
  //       checkNode('httpsURL', watchHTTPSURL)
  //   }, 300)
  // }, [watchHTTPSURL])

  // useEffect(() => {
  //   if (inputChangeTimeout) clearTimeout(inputChangeTimeout)
  //   inputChangeTimeout = setTimeout(() => {
  //     if (watchWSSURL && watchWSSURL != appStore.appData.provider.wssURL)
  //       checkNode('wssURL', watchWSSURL)
  //   }, 300)
  // }, [watchWSSURL])

  useEffect(() => {
    const appData = appStore.appData
    if (
      appData.provider.type === 'private' &&
      appData.provider.httpsURL &&
      appData.provider.wssURL
    ) {
      setValue('httpsURL', appData.provider.httpsURL)
      setValue('wssURL', appData.provider.wssURL)
      // setAreValidProviders({
      //   httpsURL: !_.isEmpty(appData.provider.httpsURL),
      //   wssURL: !_.isEmpty(appData.provider.wssURL)
      // })
      return
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
          {inputsData.map((inputItem) => (
            <div key={inputItem.id}>
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-jarvis-secondary mb-2">
                {inputItem.label}
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-transparent text-gray-200 sm:text-sm">
                  {inputItem.inputLabel}
                </span>
                <input
                  type="text"
                  {...register(inputItem.id, { required: true })}
                  className={`
            ${
              errors[inputItem.id]
                ? 'border-red-600 text-red-600 placeholder-red-600'
                : 'border-gray-300'
            }
             border-gray-300 flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md shadow-sm outline-none sm:text-sm bg-transparent focus:bg-white placeholder-white	 text-white focus:text-black transform transition-colors`}
                  placeholder="https://your-node-https-url/"
                />
              </div>
            </div>
          ))}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              disabled={!isDirty || !_.isEmpty(errors) || loading}
              // disabled={!areValidProviders.httpsURL || !areValidProviders.wssURL}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-jarvis-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:jarvis-primary disabled:opacity-20 disabled:cursor-default transform transition-opacity">
              Save changes
            </button>
          </div>
        </div>
      </Transition>
    </form>
  )
})

export default PrivateProviderSettings
