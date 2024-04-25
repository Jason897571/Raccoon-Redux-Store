import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        product_list:[]
    },
    reducers: {
        updateProducts: (state, action) => {
            state.product_list = action.payload
        },
    }

})


export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;