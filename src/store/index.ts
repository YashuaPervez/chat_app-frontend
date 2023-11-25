import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userApi from "./slices/userApi";
import messageApi from "./slices/messageApi";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(messageApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
