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
            _sort: '',
            _order: '',
            category_like: "",
            title_like: "",
            price_range_like: "",
            rating_like: "",
            brand_lile: "",
        },
        list: [],
        isLoading: false,
        searchTerm : '',
    },
    pagination: {
        list: [],
        isLoading: false,
    },
    selected: [],
    error: null
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

// Delete Product 

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_DATA}/products/${id}`)
            return res.data
        } 
        catch (err) {
            return err
        }
    }
)

// Update Product

export const updateProductItemDbJson = createAsyncThunk(
    'product/patch',
    async ({id, newProductUpdate}) => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_DATA}/products/${id}`, newProductUpdate)
            return res.data
        }
        catch(err) {
            return err
        }
    }
)

// Add product

export const addProductItemDbJson = createAsyncThunk(
    'product/add',
    async (newProduct) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_DATA}/products`, newProduct)
            return res.data
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
        setProductsShopFilter: (state,action) => {
            state.shop.filter = action.payload
        },
        search: (state,action) => {
            state.shop.searchTerm = action.payload
        },
        setSelected: (state,action) => {
            state.selected.push(action.payload)
        },
        clearSelected: (state) => {
            state.selected = []
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
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
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
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })

        .addCase(getShopProducts.pending, (state) => {
            state.shop.isLoading = true
        })
        .addCase(getShopProducts.fulfilled, (state, action) => {
            state.shop.isLoading = false
            state.shop.list = action.payload
        })
        .addCase(getShopProducts.rejected, (state, action) => {
            state.shop.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })

        .addCase(getPagination.pending, (state) => {
            state.pagination.isLoading = true
        })
        .addCase(getPagination.fulfilled, (state, action) => {
            state.pagination.isLoading = false
            state.pagination.list = action.payload
        })
        .addCase(getPagination.rejected, (state, action) => {
            state.pagination.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })

        .addCase(updateProductItemDbJson.pending, (state) => {
            state.shop.isLoading = true
        })
        .addCase(updateProductItemDbJson.fulfilled, (state, action) => {
            state.shop.isLoading = false
        })
        .addCase(updateProductItemDbJson.rejected, (state, action) => {
            state.shop.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })

        .addCase(deleteProduct.pending, (state) => {
            state.shop.isLoading = true
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.shop.isLoading = false
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.shop.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
    }
})

export const { 
setProductsShopFilter,
search,
setSelected,
clearSelected

} = ProductsSlice.actions
export default ProductsSlice.reducer
