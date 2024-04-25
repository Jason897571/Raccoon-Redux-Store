import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import categorySlice from './categorySlice'
import productSlice from './productSlice'

export default configureStore({
  reducer: {
    cart:cartSlice,
    category:categorySlice,
    product:productSlice

  }
})