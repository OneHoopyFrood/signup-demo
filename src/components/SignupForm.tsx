import { useEffect, useState } from 'react'

type SignupFormValues = {
  username: string
  password: string
  confirmPassword: string
}

enum SignupFormErrors {
  None,
  NoMatch = 'Passwords do not match',
  MissingFields = 'All fields are required',
}

/**
 * A controller and state manager for the signup form
 */
const SignupForm: React.FC = () => {
  const [signupFormValues, setSignUpFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  } as SignupFormValues)
  const [error, setError] = useState(SignupFormErrors.None)
  const [firstSubmit, setFirstSubmit] = useState(false)

  useEffect(() => {
    const savedValues = localStorage.getItem('signupFormValues')
    if (savedValues) {
      setSignUpFormValues(JSON.parse(savedValues))
    }
  }, []) // Do this only once

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Set the first submit to true only if it is false, indicating that the
    // form was not submitted before
    firstSubmit || setFirstSubmit(true)

    validateForm() && persistState()
  }

  /**
   * Validates the form values and sets the error state accordingly
   */
  const validateForm = (): boolean | void => {
    const hasUsername = signupFormValues.username.length > 0
    const hasPassword = signupFormValues.password.length > 0
    const hasPasswordConfirm = signupFormValues.confirmPassword.length > 0

    if (hasUsername && hasPassword && hasPasswordConfirm) {
      const passwordMatch =
        signupFormValues.password === signupFormValues.confirmPassword
      if (passwordMatch) {
        setError(SignupFormErrors.None)
        return true
      }
      setError(SignupFormErrors.NoMatch)
      return false
    }
    setError(SignupFormErrors.MissingFields)
    return false
  }

  const persistState = () => {
    localStorage.setItem('signupFormValues', JSON.stringify(signupFormValues))
  }

  // Event handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setSignUpFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    if (firstSubmit) {
      validateForm()
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-slate-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3'>
        <h1 className='text-center text-2xl font-bold mb-4'>Signup</h1>
        {error !== SignupFormErrors.None && (
          <p
            className='bg-red-100 border border-red-400 text-red-700 text-center px-4 py-3 rounded mb-2'
            role='alert'
          >
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'
            value={signupFormValues.username}
            onChange={handleChange}
            placeholder='Username'
            required
          />
          <input
            type='password'
            name='password'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'
            value={signupFormValues.password}
            onChange={handleChange}
            placeholder='Password'
            required
          />
          <input
            type='password'
            name='confirmPassword'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'
            //
            onChange={handleChange}
            placeholder='Confirm Password'
            required
          />
          <div className='flex items-center justify-center'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
