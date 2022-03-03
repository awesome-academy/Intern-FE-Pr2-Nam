import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    wishListArr: [],
    isLoading: false,
    error: null
}

export const addProductToWishList = createAsyncThunk(
    'wish-list/post',
    async (wishList) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_DATA}/wishList`, wishList)
            return res.data
        } 
        catch (err) {
            return err
        }
    }
)

export const getWishListFromDbJson = createAsyncThunk(
    'wishList/get',
    async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_DATA}/wishList?userId=${id}`)
            return res.data
        } 
        catch (err) {
            return err
        }
    }
)

export const WishListSlice = createSlice({
    name: 'wishList',
    initialState,
    extraReducers: builder => {
        builder
        .addCase(addProductToWishList.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addProductToWishList.fulfilled, (state, action) => {
            state.wishList= action.payload
            state.isLoading = false
        })
        .addCase(addProductToWishList.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })

        .addCase(getWishListFromDbJson.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getWishListFromDbJson.fulfilled, (state, action) => {
            state.wishList= action.payload
            state.isLoading = false
        })
        .addCase(getWishListFromDbJson.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
    }
})

export const { 
} = WishListSlice.actions
export default WishListSlice.reducer
