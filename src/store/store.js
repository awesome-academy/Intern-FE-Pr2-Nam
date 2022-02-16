import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from "./Slide/ProductsSlide"
import CartReducer from "./Slide/CartSlice"
export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        cart: CartReducer
    }
})
