import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers';

const middleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware().concat(/* your custom middleware */);
};

export const store = configureStore({
  reducer: {
    user: userReducer 
  },
  middleware,
});
