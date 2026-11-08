import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginstatus: localStorage.getItem('loginstatus') === 'true',
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loginstatus = true
            state.user = action.payload
            localStorage.setItem('loginstatus', 'true')
        },
        logout: (state) => {
            state.loginstatus = false
            state.user = null
            localStorage.removeItem('loginstatus')
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer