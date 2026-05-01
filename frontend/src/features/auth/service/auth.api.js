import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE_URL || ""

const authApiInstance = axios.create({
    baseURL: `${BASE}/api/auth`,
    withCredentials: true
})

export const registerUser = async ({email,contact,password,fullname,isSeller}) => {
        const response = await authApiInstance.post("/register",{email,contact,password,fullname,isSeller})
        return response.data
}

export const loginUser = async ({email,password}) => {
    const response = await authApiInstance.post("/login",{email,password})
    return response.data
}

export const getUser = async()=>{
    const response = await authApiInstance.get("/me")
    return response.data
}