import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    fullName: null,
    email: null,
    error: null,
    loading: false,
    showSignupForm: false
}

const userSlice = createSlice ({
    name: 'userInfo',
    initialState: initialState,
    reducers: {
        setIsLoggedIn: (state, action)=>({
            ...state, isLoggedIn: action.payload
        }),
        setFullName: (state, action)=>({
            ...state, fullName: action.payload
        }),
        setEmail: (state, action)=>({
            ...state, email: action.payload
        }),
        setError: (state, action)=>({
            ...state, error: action.payload
        }),
        setLoading: (state, action)=>({
            ...state, loading: action.payload
        }),
        setShowSignupForm: (state, action) =>({
            ...state, showSignupForm: action.payload
        })
    }
}
)
export const { setIsLoggedIn, setFullName, setEmail, setError, setLoading, setShowSignupForm} = userSlice.actions
export default userSlice.reducer
