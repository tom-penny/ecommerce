import axios from 'axios'

export const getAllAddresses = (userId) => {
    return axios.get(`/api/users/${userId}/addresses`, { withCredentials: true })
}

export const createAddress = (userId, address) => {
    return axios.post(`/api/users/${userId}/addresses`, { ...address }, { withCredentials: true })
}

export const deleteAddress = (userId, addressId) => {
    return axios.delete(`/api/users/${userId}/addresses/${addressId}`, { withCredentials: true })
}