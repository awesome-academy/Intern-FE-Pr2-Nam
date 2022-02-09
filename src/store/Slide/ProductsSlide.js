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
    },
    shop: {
        filter : {
            _page: 1,
            _limit: 9,
        },
        list: [],
        isLoading: false,
    },
    pagination: {
        list: [],
        isLoading: false,
    },

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

// Get shop products
export const getShopProducts = createAsyncThunk(
    'products/shop',
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

// get Pagination products
export const getPagination = createAsyncThunk(
    'pagination',
    async (filter) => {
        try {
            const paramString = queryString.stringify(filter)
            const res = await axios.get(`${process.env.REACT_APP_DATA}/products?${paramString}`)
            const data = res.data
            return { data, filter }
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
            state.filter = action.payload
        },
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

        .addCase(getShopProducts.pending, (state) => {
            state.shop.isLoading = true
        })
        .addCase(getShopProducts.fulfilled, (state, action) => {
            state.shop.isLoading = false
            state.shop.list = action.payload
        })
        .addCase(getShopProducts.rejected, (state) => {
            state.shop.isLoading = false
        })

        .addCase(getPagination.pending, (state) => {
            state.pagination.isLoading = true
        })
        .addCase(getPagination.fulfilled, (state, action) => {
            state.pagination.isLoading = false
            state.pagination.list = action.payload
        })
        .addCase(getPagination.rejected, (state) => {
            state.pagination.isLoading = false
        })
    }
})

export const { 
setProductsFilter,
setCurrentPage
} = ProductsSlice.actions
export default ProductsSlice.reducer
