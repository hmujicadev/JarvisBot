
import { appStore } from '../../store/appStore'

const Automatically = () => {
  return (
    <div className="relative">
      <h1 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {appStore.greeting}
      </h1>
    </div>
  )
}

export default Automatically
