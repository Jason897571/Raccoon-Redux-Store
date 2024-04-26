import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: "store",
    initialState: {
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
        
    },
    reducers:{
        //update products list to show in the page
        updateProducts: (state, action) => {
            state.products=action.payload;
        },
        

        addToCart: (state, action) => {

            state.cart.push(action.payload);
            state.cartOpen = true;
           
        },

        addMultipleToCart: (state, action) => {
            state.product_id = action.payload._id;
        },

        updateCartQuantity: (state, action) => {
            state._id = action.payload._id;
            state.purchaseQuality = action.payload.purchaseQuality;
        },

        removeFromCart: (state, action) => {
            
        },

        clearCart: (state, action) => {
            
        },
        toggleCart:(state, action)=>{
            state.cartOpen = !state.cartOpen;
            
        },
        updateCategories: (state, action) => {
            
        },
        updateCurrentCategory: (state, action) => {
            
        }
        


    }
})


export const { 
    updateProducts, 
    addToCart, 
    addMultipleToCart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    toggleCart,
    updateCategories,
    updateCurrentCategory} = cartSlice.actions;

export default cartSlice.reducer;