import { useState } from 'react'

type SignupFormValues = {
  username: string
  password: string
  confirmPassword: string
}

type Nullable<T> = T | null
/**
 * A controller and state manager for the signup form
 */
const SignupForm: React.FC = () => {
  const [signupFormValues, setSignUpFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  } as SignupFormValues)
  const [hasError, setHasError] = useState(false)
  const [firstSubmit, setFirstSubmit] = useState(false)

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Set the first submit to true only if it is false, indicating that the
    // form was not submitted before
    firstSubmit && setFirstSubmit(true)
    validateForm()
  }

  // Validate the form values and set the error message if necessary
  const validateForm = (): boolean => {
    setHasError(signupFormValues.password !== signupFormValues.confirmPassword)
    return hasError
  }

  // Event handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setSignUpFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    validateForm()
  }

  return (
    <>
      <h1>Signup</h1>
      {hasError && (
        <div className='alert'>
          <p>Passwords do not match</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type='username'
          name='username'
          value={signupFormValues.username}
          onChange={handleChange}
          placeholder='Username'
        />
        <input
          type='password'
          name='password'
          value={signupFormValues.password}
          onChange={handleChange}
          placeholder='Password'
        />
        <input
          type='password'
          name='confirmPassword'
          value={signupFormValues.confirmPassword}
          onChange={handleChange}
          placeholder='Confirm Password'
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default SignupForm
