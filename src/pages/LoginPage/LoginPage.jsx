import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../../reducers/user.reducer.js'
import { LoadingButton } from '../../components'

import './LoginPage.scss'

const LoginPage = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { userId, status, error } = useSelector(state => state.user)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Return to previous location upon login.

    useEffect(() => {
        if (userId) {
            navigate(location.state?.from || '/account')
        }
    }, [userId, navigate, location])

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
    }

    const handleClick = (e) => {
        e.preventDefault()
        const from = location.state?.from || '/'
        navigate('/register', { state: { from }})
    }

    return <div className='login-page'>
        <form className='form' onSubmit={handleSubmit}>
            {status === 'failed' && <div className='form__error' data-test='error-message'>{`${error}. Please try again.`}</div>}
            <input className='form__input' type='email' value={email} placeholder='Email'
                onChange={(e) => setEmail(e.target.value)} data-test='input-email'/>
            <input className='form__input' type='password' value={password} placeholder='Password'
                onChange={(e) => setPassword(e.target.value)} data-test='input-password'/>
            <LoadingButton className='form__btn' isLoading={status === 'loading'} type='submit' data-test='submit-login'>Login</LoadingButton>
            <div className='form__prompt'>
                Don't have an account? <a href='#' onClick={handleClick}>Sign up</a>
            </div>
        </form>
    </div>
}

export default LoginPage