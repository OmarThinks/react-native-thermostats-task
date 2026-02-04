import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { thermostatsApi } from "./api/thermostatsApi/thermostatsApi";
import { temperaturesSlice } from "./temperaturesSlice/temperaturesSlice";

const store = configureStore({
  reducer: {
    [thermostatsApi.reducerPath]: thermostatsApi.reducer,
    [temperaturesSlice.name]: temperaturesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thermostatsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector = useSelector.withTypes<RootState>();

export { store, useAppDispatch, useAppSelector };
export type { AppDispatch, RootState };
