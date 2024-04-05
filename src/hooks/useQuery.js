import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useQueryParams = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [queryParams, setParams] = useState(new URLSearchParams(location.search))

    useEffect(() => {
        setParams(new URLSearchParams(location.search))
    }, [location.search])

    const setQueryParams = (path, params) => {
        const newParams = new URLSearchParams()

        Object.entries(params).forEach(([key, value]) => {
            if (value) newParams.set(key, value)
        })

        setParams(newParams)

        navigate({ pathname: path, search: newParams.toString() }, { replace: true })
    }

    return [queryParams, setQueryParams]
}