import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "CartItemSlice",
    initialState:{
        cartItemList: [],
        totalPrice:0
    },
    reducers:{
        setCartItemList: (state,action)=>{
          state.cartItemList = action.payload;
          console.log(state.cartItemList);
          state.cartItemList.map((obj)=>{
            obj.productId.qty = 1;
            state.totalPrice = state.totalPrice + obj.productId.price * 1;
          });
        },
        updateQuantity: (state,action)=>{
          let qty = action.payload.qty;
          let index = action.payload.index;
          let obj = state.cartItemList[index];
          obj.productId.qty = qty;
          state.cartItemList.splice(index,1);
          state.cartItemList.splice(index,0,obj);
          state.totalPrice = 0;
          state.cartItemList?.map((item)=>{
            state.totalPrice = state.totalPrice + item.productId.price * item.productId.qty;
          });
        },
        removeItem:(state,action)=>{
          if(window.confirm("Do you want remove it?")){
           console.log(action.payload); 
           state.cartItemList.splice(action.payload,1);
           state.cartItemList = [...state.cartItemList];
          }
        }
    }
});
export const {setCartItemList, updateQuantity, removeItem} = slice.actions;
export default slice.reducer;