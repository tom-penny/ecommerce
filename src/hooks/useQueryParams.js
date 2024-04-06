import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useQueryParams = () => {

    const location = useLocation()
    const navigate = useNavigate()
    
    const [queryParams, setParams] = useState(new URLSearchParams(location.search))

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        setParams(Object.fromEntries(params))
    }, [location.search])

    const setQueryParams = (path, params) => {
        const newParams = new URLSearchParams()

        Object.entries(params).forEach(([key, value]) => {
            if (value) newParams.set(key, value)
        })

        navigate({ pathname: path, search: newParams.toString() }, { replace: true })
    }

    return [queryParams, setQueryParams]
}

export default useQueryParams