import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './storeSlice'


export default configureStore({
  reducer: {
    cart:cartSlice,

  }
})