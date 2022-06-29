import {configureStore} from '@reduxjs/toolkit';
import workingReducer from 'src/store/workingSlice';
import wifiReducer from 'src/store/wifiSlice';
import locationSlice from 'src/store/locationSlice';

export const store = configureStore({
  reducer: {
    working: workingReducer,
    wifi: wifiReducer,
    location: locationSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
