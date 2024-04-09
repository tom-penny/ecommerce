import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { registerUser } from '../../reducers/user.reducer'
import { BarLoader } from 'react-spinners'

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

    // Return to previous location upon registration.

    useEffect(() => {
        if (status === 'succeeded') {
            navigate(location.state?.from || '/')
        }
    }, [status, navigate, location])

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(registerUser({ email, password }))
    }

    const handleClick = (e) => {
        e.preventDefault()
        const from = location.state?.from || '/'
        navigate('/login', { state: { from }})
    }

    return <div className='register-page'>
        <form className='form' onSubmit={handleSubmit}>
        {status === 'failed' && <div className='form__error' data-test='error-message'>{`${error}. Please try again.`}</div>}
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
            <button className='form__btn' type='submit' data-test='submit-register'>
                {status === 'loading' ? <BarLoader loading={true} size={8}/> : 'Register'}
            </button>
            <div className='form__prompt'>
                Got an account? <a href='#' onClick={handleClick}>Log in</a>
            </div>
        </form>
    </div>
}

export default RegisterPage