import React from 'react'
import SignupForm from './SignupForm'

/**
 * This is the root component of the application.
 * In this demo it doesn't do much. In another application it might establish
 * context providers or other general setup.
 */
const App = () => {
  return (
    <div className='bg'>
      <SignupForm />
    </div>
  )
}

export default App
