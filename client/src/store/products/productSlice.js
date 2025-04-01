import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getNewProducts } from "./asyncAction"

export const productSlice = createSlice({
  name: "product",
  initialState: {
    newProducts: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoading = false
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(getNewProducts.pending, (state) => {
      state.isLoading = true
    })
    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false
      state.newProducts = action.payload
    })
    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getNewProducts.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false
      state.errorMessage = action.payload.message
    })
  },
})

// export const {} = appSlice.actions
export default productSlice.reducer
