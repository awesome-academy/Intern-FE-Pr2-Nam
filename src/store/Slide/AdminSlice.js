import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    isLoading: false,
    historyOrder: []
}

// Get all order
export const getOrderFromDbJsonAdmin = createAsyncThunk(
    'order/get',
    async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_DATA}/order`)
            return res.data
        } 
        catch (err) {
            return err
        }
    }
)

//Update status of order

export const updateStatusOrder = createAsyncThunk(
    'order/update',
    async ({ id, newOrderStatus }) => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_DATA}/order/${id}`, newOrderStatus)
            return res.data
        }
        catch(err) {
            return err
        }
    }
)

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    },
    extraReducers: builder =>{
        builder
        .addCase(getOrderFromDbJsonAdmin.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(getOrderFromDbJsonAdmin.fulfilled, (state, action) => {
            state.historyOrder = action.payload
            state.isLoading = false
        })
        .addCase(getOrderFromDbJsonAdmin.rejected, (state, action) => {
            state.isLoading = false
        })

    }
})

export const { 

} = AdminSlice.actions
export default AdminSlice.reducer
