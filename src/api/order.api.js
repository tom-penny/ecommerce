import axios from 'axios'

export const getAllOrders = (userId, page = 1, sort = 'date', order = 'asc') => {
    return axios.get(`/api/users/${userId}/orders?page=${page}&size=${12}&sort=${sort}&order=${order}`, { withCredentials: true })
}

export const createOrder = (checkoutId, userId, amount, items) => {
    return axios.post(`/api/orders`, { checkoutId, userId, amount, items }, { withCredentials: true })
}