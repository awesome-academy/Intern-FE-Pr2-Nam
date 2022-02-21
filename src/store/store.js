import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from "./Slide/ProductsSlide"
import CartReducer from "./Slide/CartSlice"
import UserReducer from "./Slide/UserSlice"
export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        cart: CartReducer,
        user: UserReducer,
    }
})
