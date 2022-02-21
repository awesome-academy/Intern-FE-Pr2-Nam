import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const userInfo = JSON.parse(localStorage.getItem('user-info'));

const initialState = {
    displayName: userInfo ? userInfo.full_name : '',
    isLoading: false
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

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    }
})

export const { 

} = UserSlice.actions
export default UserSlice.reducer
