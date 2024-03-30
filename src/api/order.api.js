import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export const getAllOrders = (userId) => {
    return axios.get(`/api/users/${userId}/orders`, { withCredentials: true })
}

export const createOrder = (checkoutId, userId, amount, items) => {
    return axios.post(`/api/orders`, { checkoutId, userId, amount, items }, { withCredentials: true })
}