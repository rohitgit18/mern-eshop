import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice";
import UserSlice from "./UserSlice";
import CartItemSlice from "./CartItemSlice";

const store = configureStore({
    reducer :{
        Categories: CategorySlice,
        User: UserSlice,
        CartItems: CartItemSlice
    }
});

export default store;