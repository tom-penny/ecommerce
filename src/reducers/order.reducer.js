import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/order.api.js'

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async ({ userId, page, sort, order }, { rejectWithValue }) => {
        try {
            const response = await api.getAllOrders(userId, page, sort, order)
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        count: 0,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.orders = action.payload.orders
                state.count = action.payload.count
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.errors[0]
            })
    }
})

export default orderSlice.reducer