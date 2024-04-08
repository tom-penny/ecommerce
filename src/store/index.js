import { configureStore } from '@reduxjs/toolkit'
import addressReducer from '../reducers/address.reducer.js'
import basketReducer from '../reducers/basket.reducer.js'
import categoryReducer from '../reducers/category.reducer.js'
import orderReducer from '../reducers/order.reducer.js'
import productReducer from '../reducers/product.reducer.js'
import userReducer from '../reducers/user.reducer.js'

const store = configureStore({
    reducer: {
        address: addressReducer,
        basket: basketReducer,
        category: categoryReducer,
        order: orderReducer,
        product: productReducer,
        user: userReducer
    }
})

export default store