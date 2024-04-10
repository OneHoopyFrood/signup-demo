import { useEffect, useState } from 'react'

const SignupFormErrors = {
  None: null,
  NoMatch: 'Passwords do not match!',
  MissingFields: 'All fields are required',
}

/**
 * A controller and state manager for the signup form
 */
const SignupForm = () => {
  const [signupFormValues, setSignUpFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(SignupFormErrors.None)
  const [firstSubmit, setFirstSubmit] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [persisted, setPersisted] = useState(false)

  // On initial render, check if there are saved values in local storage
  // and set the form values accordingly
  useEffect(() => {
    const savedValues = localStorage.getItem('signupFormValues')
    if (savedValues) {
      // We'll only pull the username out of storage. The password and confirm
      // are there, but it feels wrong to prefill them.
      setSignUpFormValues(JSON.parse(savedValues)['username'])
      setPersisted(true)
    }
  }, []) // Do this only once

  const clearPersistedValues = () => {
    localStorage.removeItem('signupFormValues')
    setSignUpFormValues({
      username: '',
      password: '',
      confirmPassword: '',
    })
    setPersisted(false)
    setError(SignupFormErrors.None)
    setAccepted(false)
  }

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setFirstSubmit(true)

    if (validateForm()) {
      setAccepted(true)
      persistState()
    }
  }

  /**
   * Validates the form values and sets the error state accordingly
   */
  const validateForm = () => {
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
  const handleChange = (e) => {
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
    <div className='container'>
      <h1>Signup</h1>
      {accepted && <p className='alert success'>Saved</p>}
      {error !== SignupFormErrors.None && (
        <p className='alert error'>{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={signupFormValues.username}
          onChange={handleChange}
          placeholder='Username'
          required
        />
        <input
          type='password'
          name='password'
          value={signupFormValues.password}
          onChange={handleChange}
          placeholder='Password'
          required
        />
        <input
          type='password'
          name='confirmPassword'
          value={signupFormValues.confirmPassword}
          onChange={handleChange}
          placeholder='Confirm Password'
          required
        />
        <div className='btns'>
          <button className='btn signup' type='submit'>
            Sign Up
          </button>
          {persisted && (
            <button
              type='button'
              className='btn clear'
              onClick={clearPersistedValues}
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default SignupForm
