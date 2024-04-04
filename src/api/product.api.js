import axios from 'axios'

export const getProductById = (id) => {
    return axios.get(`/api/products/${id}`, { withCredentials: true })
}

export const getAllProducts = (page = 1, sort = 'name', order = 'asc') => {
    return axios.get(`/api/products?page=${page}&size=${12}&sort=${sort}&order=${order}`, { withCredentials: true })
}

export const getProductsByCategory = (slug, page = 1, sort = 'name', order = 'asc') => {
    return axios.get(`/api/categories/${slug}/products?page=${page}&size=${12}&sort=${sort}&order=${order}`, { withCredentials: true })
}