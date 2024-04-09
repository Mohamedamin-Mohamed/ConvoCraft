import { configureStore } from '@reduxjs/toolkit'
import userSlice  from './userSlice'

const store = configureStore({
    reducer: {
    userInfo: userSlice
    }
})
export default store