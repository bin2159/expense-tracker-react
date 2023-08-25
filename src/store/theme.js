import { createSlice } from "@reduxjs/toolkit";

const initialState={darkTheme:false}
const themeSlice=createSlice({
    name:'theme',
    initialState,
    reducers:{
       setTheme(state){
        state.darkTheme=!state.darkTheme
       }
    }
})

export default themeSlice.reducer
export const themeActions=themeSlice.actions