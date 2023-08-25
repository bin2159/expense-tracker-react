const { createSlice } = require("@reduxjs/toolkit");

const tokenId=localStorage.getItem('token')
const initialState = {
  token: tokenId,
  isLoggedIn: !!tokenId,
};
const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers:{
    addToken(state,action){
        localStorage.setItem('token',action.payload)
        state.token= action.payload
    },
    removeToken(state){
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        state.token=null
    }
  }
});

export default authSlice.reducer
export const authActions=authSlice.actions