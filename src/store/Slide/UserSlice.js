import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const userInfo = JSON.parse(localStorage.getItem('user-info'));

const initialState = {
    displayName: userInfo ? userInfo.full_name : '',
    isLoading: false,
    historyOrder: [],
}

export const addUserToDbJson = createAsyncThunk(
    'user/post',
    async (user) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_DATA}/user`, user)
            return res.data
        } 
        catch (err) {
            return err
        }
    }
)

export const getUserFromDbJson = createAsyncThunk(
    'user/get',
    async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_DATA}/user/${id}`)
            return res.data
        } 
        catch (err) {
            return err
        }
    }
)

export const getOrderFromDbJson = createAsyncThunk(
    'order/get',
    async (email) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_DATA}/order?email=${email}`)
            return res.data
        } 
        catch (err) {
            return err
        }
    }
)

export const updateUser = createAsyncThunk(
    'cart/update',
    async ({ id, newUserData }) => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_DATA}/user/${id}`, newUserData)
            return res.data
        }
        catch(err) {
            return err
        }
    }
)

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: builder =>{
        builder
        .addCase(getUserFromDbJson.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUserFromDbJson.fulfilled, (state, action) => {
            const { full_name, email, phone, id, role, wishList} = action.payload
            localStorage.setItem('user-info', JSON.stringify({
                id,
                full_name,
                email,
                phone,
                role,
                wishList
            }))
            state.isLoading = false
        })
        .addCase(getUserFromDbJson.rejected, (state, action) => {
            state.isLoading = false
        })


        .addCase(getOrderFromDbJson.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(getOrderFromDbJson.fulfilled, (state, action) => {
            state.historyOrder = action.payload
            state.isLoading = false
        })
        .addCase(getOrderFromDbJson.rejected, (state, action) => {
            state.isLoading = false
        })

        .addCase(updateUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false
            localStorage.setItem('user-info', JSON.stringify(action.payload))
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

export const { 
} = UserSlice.actions
export default UserSlice.reducer
