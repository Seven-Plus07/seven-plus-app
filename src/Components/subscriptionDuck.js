
// Acciones
const SET_SUBSCRIPTION = 'SET_SUBSCRIPTION';

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

export default subscriptionReducer;
