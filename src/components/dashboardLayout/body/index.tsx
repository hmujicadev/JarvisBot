import { ReactNode } from 'react'

interface BodyProps {
  children: ReactNode
}

const Body = ({ children }: BodyProps) => {
  return (
    <>
      {/* Main content */}
      <div className="relative flex-1">
        <main className="flex-1 min-h-screen bg-jarvis-bg">{children}</main>
      </div>
    </>
  )
}

export default Body
