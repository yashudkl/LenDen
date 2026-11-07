import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loginstatus: localStorage.getItem('loginstatus') === 'true'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       login: (state,action)=>{

        state.loginstatus = true
        localStorage.setItem('loginstatus',true)

    },
       logout: (state,action) =>{
     state.loginstatus = false
        localStorage.removeItem('loginstatus')
       }
    }
})
export const {login,logout} = authSlice.actions
export default authSlice.reducer