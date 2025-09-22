import { createSlice } from "@reduxjs/toolkit";

export const categoryslice = createSlice({
    name: 'category',
    initialState: {
        list: []
    },
    reducers: {
        addcategory: (state, action) => {
            // const { id } = action.payload;
            const check = state.list.some(c => c.id === action.payload.id);

            if (!check) {
                state.list.push(action.payload);
            }
        }
    }
})

export const { addcategory } = categoryslice.actions;

export default categoryslice.reducer;