import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

export const useAuth = () => {
    
    const navigate = useNavigate()
    const location = useLocation()
    
    const { userId } = useSelector(state => state.user)

    const isAuthenticated = !!userId

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location }})
        }
    }, [userId, navigate, location])

    return isAuthenticated
}

export default useAuth