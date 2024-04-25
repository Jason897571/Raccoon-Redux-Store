import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        _id: null,
        purchaseQuality:1
    },
    reducers:{
        

        addToCart: (state, action) => {
            state.product_id = action.payload._id;
            state.quality = action.payload.purchaseQuality;
        },

        addMultipleToCart: (state, action) => {
            
        },

        updateCartQuantity: (state, action) => {
            
        },

        removeFromCart: (state, action) => {
            
        },

        clearCart: (state, action) => {
            
        },
        ToggleCart:(state, action)=>{

        },
        


    }
})


export const { 
    updateProducts, 
    addToCart, 
    addMultipleToCart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    ToggleCart,} = cartSlice.actions;

export default cartSlice.reducer;