import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoggedIn: false,
  current: null,
  token: null,
  // các state khác nếu có
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
      state.current = action.payload.userData
    },
    // các reducers khác
  },
})

export const { register } = userSlice.actions
export default userSlice.reducer
