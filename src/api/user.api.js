import axios from 'axios'

export const registerUser = (firstName, lastName, email, password) => {
    return axios.post('/api/auth/register', { firstName, lastName, email, password }, { withCredentials: true })
}

export const loginUser = (email, password) => {
    return axios.post('/api/auth/login', { email, password }, { withCredentials: true })
}

export const logoutUser = () => {
    return axios.post('/api/auth/logout', { withCredentials: true })
}