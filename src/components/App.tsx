import React from 'react'
import SignupForm from './SignupForm'

/**
 * This is the root component of the application.
 */
const App: React.FC = () => {
  return (
    <div className='bg-slate-800 text-slate-50 w-screen h-screen'>
      <SignupForm />
    </div>
  )
}

export default App
