import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reduxslices/categoryslice";
import statusReducer from "../reduxslices/statusslice";
import loginReducer from "../reduxslices/loginslice";
import titleReducer from "../reduxslices/titleslice";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        status: statusReducer,
        login: loginReducer,
        title: titleReducer
    },
})