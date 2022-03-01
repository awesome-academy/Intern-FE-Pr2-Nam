import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from "./Slide/ProductsSlide"
import CartReducer from "./Slide/CartSlice"
import UserReducer from "./Slide/UserSlice"
import AdminReducer from "./Slide/AdminSlice"
export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        cart: CartReducer,
        user: UserReducer,
        admin: AdminReducer,
    }
})
