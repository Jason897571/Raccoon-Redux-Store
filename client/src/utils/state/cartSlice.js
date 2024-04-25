import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        
    },
    reducers:{
        updateProducts: (state, action) => {
            
        },

        addToCart: (state, action) => {
            
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


export const { actions } = cartSlice.actions;

export default cartSlice.reducer;