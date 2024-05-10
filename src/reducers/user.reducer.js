import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/user.api.js'

export const fetchUser = createAsyncThunk(
    'users/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.getUser()
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

export const registerUser = createAsyncThunk(
    'users/register',
    async ({ firstName, lastName, email, password }, { dispatch, rejectWithValue }) => {
        try {
            await api.registerUser(firstName, lastName, email, password)
            return dispatch(fetchUser())
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ email, password }, { dispatch, rejectWithValue }) => {
        try {
            await api.loginUser(email, password)
            return dispatch(fetchUser())
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

export const logoutUser = createAsyncThunk(
    'users/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.logoutUser()
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data) }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState: {
        userId: null,
        profile: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.userId = action.payload.id
                state.profile = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.errors[0]
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.errors[0]
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'succeeded'
                state.userId = null
                state.profile = {}
            })
    }
})

export default userSlice.reducer