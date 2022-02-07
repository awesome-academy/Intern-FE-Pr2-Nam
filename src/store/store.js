import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from "./Slide/ProductsSlide"
export const store = configureStore({
    reducer: {
        products: ProductsReducer
    }
})
