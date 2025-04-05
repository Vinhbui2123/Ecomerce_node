import { configureStore } from "@reduxjs/toolkit"
import { appSlice } from "./app/appSlice"
import { productSlice } from "./products/productSlice"
import storage from "redux-persist/lib/storage"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import { userSlice } from "./user/userSlice"

const commonConfig = {
  key: "shop/user",
  storage: storage,
}
const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token"],
}
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    products: productSlice.reducer,
    user: persistReducer(userConfig, userSlice.reducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)
export default store
