import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { registerUser } from '../../reducers/user.reducer'
import { LoadingButton } from '../../components'

import './RegisterPage.scss'

const RegisterPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { status, error } = useSelector(state => state.user)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    // Return to previous location upon registration.

    useEffect(() => {
        if (status === 'succeeded') {
            navigate(location.state?.from || '/')
        }
    }, [status, navigate, location])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateInput()) {
            dispatch(registerUser({ firstName, lastName, email, password }))
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        const from = location.state?.from || '/'
        navigate('/login', { state: { from }})
    }

    const validationRules = [
        { test: () => !!firstName.trim(), message: 'First Name is required.'},
        { test: () => !!lastName.trim(), message: 'Last Name is required.'},
        { test: () => !!email.trim(), message: 'Email is required.'},
        { test: () => !!password.trim(), message: 'Password is required.'},
        { test: () => password.length >= 6, message: 'Password length must be at least 6 characters.'},
        { test: () => /[A-Z]/.test(password), message: 'Password must contain at least one upper case letter.'},
        { test: () => /[a-z]/.test(password), message: 'Password must contain at least one lower case letter.'},
        { test: () => /[0-9]/.test(password), message: 'Password must contain at least one number.'},
        { test: () => /[!@#$%^&*()_+{}:<>?]/.test(password), message: 'Password must contain at least one special character.'}
    ]

    const validateInput = () => {
        for (let rule of validationRules) {
            if (!rule.test()) {
                setMessage(rule.message)
                return false
            }
        }
        setMessage('')
        return true
    }

    return <div className='register-page'>
        <form className='form' onSubmit={handleSubmit}>
        {error && <div className='form__error' data-test='error-message'>{`${error}. Please try again.`}</div>}
        {message && <div className='form__error' data-test='error-message'>{message}</div>}
            <div className='form__names'>
                <input className='form__input form__input--name' type='text' value={firstName} placeholder='First Name'
                    onChange={(e) => setFirstName(e.target.value)} data-test='input-first'/>
                <input className='form__input form__input--name' type='text' value={lastName} placeholder='Last Name'
                    onChange={(e) => setLastName(e.target.value)} data-test='input-last'/>
            </div>
            <input className='form__input' type='email' value={email} placeholder='Email'
                onChange={(e) => setEmail(e.target.value)} data-test='input-email'/>
            <input className='form__input' type='password' value={password} placeholder='Password'
                onChange={(e) => setPassword(e.target.value)} data-test='input-password'/>
            <LoadingButton className='form__btn' isLoading={status === 'loading'} type='submit' data-test='submit-register'>Register</LoadingButton>
            <div className='form__prompt'>
                Got an account? <a href='#' onClick={handleClick}>Log in</a>
            </div>
        </form>
    </div>
}

export default RegisterPage