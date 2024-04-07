import axios from 'axios'

export const getAllAddresses = (userId) => {
    return axios.get(`/api/users/${userId}/addresses`, { withCredentials: true })
}

export const createAddress = (userId, street, city, country, postCode) => {
    return axios.post(`/api/users/${userId}/addresses`, { userId, street, city, country, postCode }, { withCredentials: true })
}

export const deleteAddress = (userId, addressId) => {
    return axios.delete(`/api/users/${userId}/addresses/${addressId}`, { withCredentials: true })
}