import { addItems, getCart, updateCartItemAPI, removeCartItemAPI, createCartOrder } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { setItems, addItem as addItemToCart, removeItem } from "../store/cart.slice";

export const useCart = () => {

    const dispatch = useDispatch()

    async function handleAddItems({ productId, variantId, quantity = 1 }){
        const data = await addItems({productId, variantId, quantity})
        return data
    }

    async function handleGetCart(){
        const data = await getCart();
        dispatch(setItems(data.cart.items || []))
        return data.cart
    }

    async function handleUpdateCartItem({ productId, variantId, quantity }) {
        const data = await updateCartItemAPI({ productId, variantId, quantity });
        if (data.success) {
            dispatch(setItems(data.cart.items || []));
        }
        return data;
    }

    async function handleRemoveCartItem({ productId, variantId }) {
        const data = await removeCartItemAPI({ productId, variantId });
        if (data.success) {
            dispatch(setItems(data.cart.items || []));
        }
        return data;
    }

    async function handleCreateCartOrder() {
        const data = await createCartOrder();
        
        return data.order;
    }

    

    return { handleAddItems, handleGetCart, handleUpdateCartItem, handleRemoveCartItem, handleCreateCartOrder }
}
