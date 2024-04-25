import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "category",
    initialState: {},
    reducers: {
        updateCategories: (state, action) => {
            
        },
        updateCurrentCategory: (state, action) => {
            
        }

    }
});


export const { updateCategories, updateCurrentCategory } = categorySlice.actions;

export default categorySlice.reducer;