import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/auth.slice"
import productReducer from "../features/products/store/product.slice"
import cartReducer from "../features/cart/store/cart.slice"

export const store = configureStore({
    reducer: {
        auth:authReducer,
        product:productReducer,
        cart:cartReducer
    }
})