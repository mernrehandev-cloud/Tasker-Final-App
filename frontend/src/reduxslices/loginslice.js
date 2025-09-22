import { createSlice } from "@reduxjs/toolkit";

export const loginslice = createSlice({
    name: 'login',
    initialState: {
        token: []
    },
    reducers: {
        addlogin: (state, action) => {
            // const check = state.login.some(u => u.token === action.payload.token);

            state.token.push(action.payload);
            console.log(`store okay h bahi ${state.token}`)
        },
        removelogin: (state, action) => {
            state.token.push({});
        }
    }
})

export const { addlogin, removelogin } = loginslice.actions;

export default loginslice.reducer;