import axios from "axios"

const BASE = import.meta.env.VITE_API_BASE_URL || ""

const productApiInstance = axios.create({
    baseURL: `${BASE}/api/products`,
    withCredentials: true
})

export async function createproduct(formdata){
        const response = await productApiInstance.post("/",formdata)
        return response.data
}

export async function getSellerProducts(){
        const response = await productApiInstance.get("/seller")
        return response.data
}

export async function getAllProducts(){
        const response = await productApiInstance.get("/")
        return response.data
}

export async function getProductDetails(productId){
        const response = await productApiInstance.get(`/detail/${productId}`)
        return response.data
}

export async function addProductVarient(productId ,newProductVarients){

        const formData = new FormData()

        newProductVarients.images.forEach((image)=>{
                formData.append("images",image.file)
        })
        formData.append("size",newProductVarients.size)
        formData.append("stock",newProductVarients.stock)

        const response = await productApiInstance.post(`/${productId}/variants`, formData)
        return response.data
}

export async function updateProductCategory(productId, category) {
        const response = await productApiInstance.put(`/${productId}/category`, { category })
        return response.data
}