import { configureStore } from '@reduxjs/toolkit'
import storeSlice from './storeSlice'


export default configureStore({
  reducer: {
    cart:storeSlice,

  }
})