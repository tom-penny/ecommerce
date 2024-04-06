import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/product.api.js'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, sort, order }, { rejectWithValue }) => {
        try {
            const response = await api.getAllProducts(page, sort, order)
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async ({ category, page, sort, order }, { rejectWithValue }) => {
        try {
            const response = await api.getProductsByCategory(category, page, sort, order)
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        count: 0,
        status: 'idle',
        error: null
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.products = action.payload.products
                state.count = action.payload.count
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.products = action.payload.products
                state.count = action.payload.count
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { setFilters } = productSlice.actions

export default productSlice.reducer