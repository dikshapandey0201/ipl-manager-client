import { configureStore } from "@reduxjs/toolkit";
import { teamApi } from "./features/slices/TeamSlice";
import { playerApi } from "./features/slices/PlayerSlice";
import userReducer from "./features/slices/UserSlice";

export const store = configureStore({
    reducer: {
      user:userReducer,
      [teamApi.reducerPath]: teamApi.reducer,
      [playerApi.reducerPath]: playerApi.reducer,
    },   
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(teamApi.middleware)
        .concat(playerApi.middleware),
  });    