import { configureStore } from '@reduxjs/toolkit';

// Acciones
const SET_SUBSCRIPTION = 'SET_SUBSCRIPTION';

// Acción para establecer la suscripción
export const setSubscription = (subscription) => ({
  type: SET_SUBSCRIPTION,
  payload: subscription,
});

// Estado inicial
const initialState = {
  subscription: null,
};

// Reductor
const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload,
      };
    default:
      return state;
  }
};

// Configurar el store usando configureStore
const store = configureStore({
  reducer: {
    subscription: subscriptionReducer,
  },
});

export default store;
