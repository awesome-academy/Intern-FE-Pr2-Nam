import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import queryString from 'query-string'
const initialState  = {
    productsList: [],
    status: null,
    isLoading: false,
    filter: {
        _page: 1,
        _limit: 8, 
    }

}

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (filter) => {
        try {
            const paramString = queryString.stringify(filter)
            const res = await axios.get(`http://localhost:3004/products?${paramString}`)
            const data = res.data
            return { data,filter }
        }
        catch(err) {
            return err
        }
    }
)

export const ProductsSlice  = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductsFilter: (state,action) => {
            state.productsList = action.payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getProducts.pending,(state) => {
            state.status = "loading"
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled,(state, action) => {
            state.status = "success"
            state.isLoading = false
            state.productsList = action.payload
        })
        .addCase(getProducts.rejected,(state, action) => {
            state.status ="fail"
            state.isLoading =false
        })
    }
})


export const { 
setProductsFilter
} = ProductsSlice.actions
export default ProductsSlice.reducer
