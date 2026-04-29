import { getSellerProducts, createproduct ,getAllProducts, getProductDetails , addProductVarient, updateProductCategory } from "../service/product.api.js";
import { useDispatch } from "react-redux";
import { setSellerProducts,setProducts } from "../store/product.slice.js";
import { setLoading, setError } from "../../auth/store/auth.slice.js"; 

export const useProducts = () => {
    const dispatch = useDispatch();

    async function handleCreateProduct(productData) {
        const formData = new FormData();
        
        // Append text fields
        formData.append("title", productData.title);
        formData.append("description", productData.description);
        formData.append("priceAmount", productData.priceAmount);
        formData.append("priceCurrency", productData.priceCurrency);
        formData.append("category", productData.category);

        // 2. Append files
        productData.images.forEach((imgObj) => {
            formData.append("images", imgObj.file);
        });

        try {
            dispatch(setLoading(true));
            // 3. Pass the FormData instance to your API call
            const data = await createproduct(formData);
            return data.product;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to create product"));
            throw error; // Rethrow so the component can handle failure
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetSellerProduct() {
        try {
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data.products));
            return data.products;
        } catch (error) {
            dispatch(setError("Failed to fetch products",error));
        } 
    }

    async function handleGetAllProducts() {
        const data = await getAllProducts()
        dispatch(setProducts(data.products))
    }   
    
    async function handleProductById(productId){
        const data = await getProductDetails(productId)
        return data.product
    }

    async function handleAddProductVarient(productId ,newProductVarients){
        const data = await addProductVarient(productId ,newProductVarients)
        return data
    }

    async function handleUpdateProductCategory(productId, category){
        try {
            const data = await updateProductCategory(productId, category);
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to update category"));
            throw error;
        }
    }

    return { handleCreateProduct, handleGetSellerProduct , handleGetAllProducts , handleProductById , handleAddProductVarient, handleUpdateProductCategory};
};