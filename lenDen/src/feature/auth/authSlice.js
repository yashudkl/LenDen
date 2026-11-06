import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loginstatus: localStorage.getItem('loginstatus') === 'true'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       loginState: (state,action)=>{
        state.loginstatus = true
        localStorage.setItem('loginstatus',true)

       }
       logoutState: (state,action) =>{
        state.logoustatus = false
        localStorage.removeItem('loginstatus')
       }
    }
})
export {loginState,logoutState} = authSlice.actions
export default authSlice.reducer