import { configureStore } from "@reduxjs/toolkit";
import { thermostatsApi } from "./api/thermostatsApi/thermostatsApi";

const store = configureStore({
  reducer: {
    [thermostatsApi.reducerPath]: thermostatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thermostatsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
