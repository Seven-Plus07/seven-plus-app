// Acciones
const SET_AUTHENTICATION = 'SET_AUTHENTICATION';

export const setAuthentication = (isAuthenticated) => ({
  type: SET_AUTHENTICATION,
  payload: isAuthenticated,
});

// Estado inicial
const initialAuthState = {
  isAuthenticated: false,
};

// Reductor
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
