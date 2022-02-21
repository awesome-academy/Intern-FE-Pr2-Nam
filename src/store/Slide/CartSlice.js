import { createSlice } from '@reduxjs/toolkit'

const cartItemLocalStorage = JSON.parse(localStorage.getItem('cart-list'));

const initialState = {
    cartList: cartItemLocalStorage ? cartItemLocalStorage.cartList : [],
    total:  cartItemLocalStorage ? cartItemLocalStorage.total : 0,
    cartQuantity: cartItemLocalStorage ? cartItemLocalStorage.cartQuantity : 0,
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {        
            state.total += action.payload.price

            let checkExisted = state.cartList.some(item => item.id === action.payload.id);
             
            state.cartList.forEach((item) => {
                if (item.id === action.payload.id) {
                    item.quantity +=1;
                }
            });

            if (!checkExisted) {
                state.cartList.push(action.payload);
                state.cartQuantity = state.cartList.length;
            }

            localStorage.setItem('cart-list', JSON.stringify(state));
        }
    }
})

export const { 
    addToCart
} = CartSlice.actions
export default CartSlice.reducer
