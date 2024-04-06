import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/order.api.js'

export const checkoutBasket = createAsyncThunk(
    'basket/checkoutBasket',
    async ({ checkoutId, userId, total, basket }, { rejectWithValue }) => {
        try {
            const response = await api.createOrder(checkoutId, userId, total, basket)
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        basket: {},
        checkoutId: null,
        status: 'idle',
        error: null
    },
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        resetBasket: (state) => {
            state.basket = {}
        },
        resetCheckout: (state) => {
            state.checkoutId = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutBasket.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(checkoutBasket.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.checkoutId = action.payload.checkoutId
            })
            .addCase(checkoutBasket.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { setBasket, resetBasket, resetCheckout } = basketSlice.actions

export default basketSlice.reducer