import { createSlice } from "@reduxjs/toolkit";

export const statusslice = createSlice({
    name: 'status',
    initialState: {
        list: []
    },
    reducers: {
        addstatus: (state, action) => {
            const check = state.list.some(c => c.id === action.payload.id);

            if (!check) {
                state.list.push(action.payload);
            }
        }
    }
})

export const { addstatus } = statusslice.actions;

export default statusslice.reducer;