import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from "./Slide/ProductsSlide"
import CartReducer from "./Slide/CartSlice"
import UserReducer from "./Slide/UserSlice"
import AdminReducer from "./Slide/AdminSlice"
import WishListSlice from "./Slide/WishListSlice"
export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        cart: CartReducer,
        user: UserReducer,
        admin: AdminReducer,
        wishList: WishListSlice
    }
})
