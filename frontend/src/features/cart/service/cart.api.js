import axios from "axios"

const cartAPIInstance = axios.create({
    baseURL:"/api/cart",
    withCredentials:true
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
