import { createSlice } from '@reduxjs/toolkit'

const cartItemLocalStorage = JSON.parse(localStorage.getItem('cart-list'));

const initialState = {
    cartList: cartItemLocalStorage ? cartItemLocalStorage.cartList : [],
    total:  cartItemLocalStorage ? cartItemLocalStorage.total : 0,
    cartQuantity: cartItemLocalStorage ? cartItemLocalStorage.cartQuantity : 0,
    payment_info: {
        address: '',
        email: '',
        full_name: '',
        message: '',
        payment_method: '',
        phone: '',
    }
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
        },
        updateQuantity: (state, action) => {
            const {type, id} = action.payload
            state.cartList.forEach((item) => {
                if(item.id === id) {
                    if (type === 'increase') {
                        item.quantity += 1;
                        state.total += item.price;
                    } else {
                        if (item.quantity > 1) {
                            item.quantity -= 1;
                            state.total -= item.price;
                        }
                    }
                }
            })
            localStorage.setItem('cart-list', JSON.stringify(state));
        },
        deleteProductInCart: (state, action) => {
            const newCart = state.cartList.filter((item) => item.id !== action.payload.id);
            state.total -= action.payload.price * action.payload.quantity;
            state.cartList= newCart
            state.cartQuantity= newCart.length;

            localStorage.setItem('cart-list', JSON.stringify(state));
        },
        deleteAllProduct: (state, action) => {
            state.total = 0;
            state.cartList= []
            state.cartQuantity= 0;
            localStorage.setItem('cart-list', JSON.stringify(state));
        },
        setPaymentInfo: (state, action) => {
            state.payment_info = action.payload
        }

    }
})

export const { 
    addToCart,
    updateQuantity,
    deleteProductInCart,
    deleteAllProduct,
    setPaymentInfo
} = CartSlice.actions
export default CartSlice.reducer
