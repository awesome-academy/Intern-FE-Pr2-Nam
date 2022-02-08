import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import queryString from 'query-string'

const initialState  = {
    productsList: [],
    isLoading: false,
    filter: {
        _page: 1,
        _limit: 8, 
    },
    hot: {
        filter: {
            _page: 1,
            _limit: 8,
            type: "hot"
        },
        list: [],
        isLoading: false,
    }

}

//Get all products
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (filter) => {
        try {
            const paramString = queryString.stringify(filter)
            const res = await axios.get(`${process.env.REACT_APP_DATA}/products?${paramString}`)
            const data = res.data
            return { data,filter }
        }
        catch(err) {
            return err
        }
    }
)

// Get hot products
export const getHotProducts = createAsyncThunk(
    'products/hot',
    async (filter) => {
        try {
            const paramString = queryString.stringify(filter)
            const res = await axios.get(`${process.env.REACT_APP_DATA}/products?${paramString}`)
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
        .addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.productsList = action.payload
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false
        })

        .addCase(getHotProducts.pending, (state) => {
            state.hot.isLoading = true
        })
        .addCase(getHotProducts.fulfilled, (state, action) => {
            state.hot.isLoading = false
            state.hot.list = action.payload
        })
        .addCase(getHotProducts.rejected, (state, action) => {
            state.hot.isLoading = false
        })
    }
})

export const { 
setProductsFilter
} = ProductsSlice.actions
export default ProductsSlice.reducer
