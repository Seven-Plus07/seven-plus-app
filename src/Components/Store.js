import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authDuck';
import subscriptionReducer from './subscriptionDuck';

const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
