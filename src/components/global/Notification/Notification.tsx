import { CheckCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { type } from 'os'
import { ReactNode } from 'react'

// TODO: Add more notification types

interface NotificationsIBaseProps {
  closeToast?: Function
  toastProps?: any
  type?: 'success' | 'warn' | 'error' | 'info'
}
interface NotificationsIChildrenProps extends NotificationsIBaseProps {
  children: ReactNode | Array<ReactNode>
  text?: string
}
interface NotificationsITextProps extends NotificationsIBaseProps {
  children?: ReactNode | Array<ReactNode>
  text: string
}

type NotificationsIProps = NotificationsIChildrenProps | NotificationsITextProps

const Notification = ({
  children,
  closeToast,
  toastProps,
  text,
  type = 'success'
}: NotificationsIProps) => {
  return (
    <div aria-live="assertive">
      <div className="w-full">
        <div className="p-4">
          <div className="">
            <div className="w-full pt-0.5">
              {children ? children : <p className="text-sm font-medium text-gray-200">{text}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification
