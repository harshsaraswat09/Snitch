import axios from "axios"

const BASE = import.meta.env.VITE_API_BASE_URL || ""

const cartAPIInstance = axios.create({
    baseURL: `${BASE}/api/cart`,
    withCredentials: true
})

export const addItems = async ({ productId, variantId, quantity }) => {
    const response = await cartAPIInstance.post(`/add/${productId}/${variantId}`, { quantity })
    return response.data
}

export const getCart = async () => {
    const response = await cartAPIInstance.get('/')
    return response.data
}

export const updateCartItemAPI = async ({ productId, variantId, quantity }) => {
    const response = await cartAPIInstance.put(`/update/${productId}/${variantId}`, { quantity })
    return response.data
}

export const removeCartItemAPI = async ({ productId, variantId }) => {
    const response = await cartAPIInstance.delete(`/remove/${productId}/${variantId}`)
    return response.data
}

export const createCartOrder = async () => {
    const response = await cartAPIInstance.post(`/payment/create/order`)
    return response.data
}