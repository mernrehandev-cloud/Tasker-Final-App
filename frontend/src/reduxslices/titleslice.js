import { createSlice } from "@reduxjs/toolkit";

export const titleslice = createSlice({
    name: 'title',
    initialState: {
        value: ""
    },
    reducers: {
        settitle: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { settitle } = titleslice.actions;

export default titleslice.reducer;