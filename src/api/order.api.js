import axios from 'axios'

export const getAllOrders = (userId) => {
    return axios.get(`/api/users/${userId}/orders`, { withCredentials: true })
}

export const createOrder = (checkoutId, userId, amount, items) => {
    return axios.post(`/api/orders`, { checkoutId, userId, amount, items }, { withCredentials: true })
}