import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as actions from "./asyncActions"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.isLoading = false
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true
    })
    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false
      state.categories = action.payload
    })
    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false
      state.errorMessage = action.payload.message
    })
  },
})

export const {} = appSlice.actions
export default appSlice.reducer
