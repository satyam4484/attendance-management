
const initialState = {
  currentSelected: 0,
  isLoggedIn: false,
  isLoading: false,
  userCred: {}, // User credentials or information
  token:"",
  error: { isError: false, message: "", type: "error" },
};

// Define the global reducer function that handles state updates
const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAV_LINK_CURRENT_SELECTED":
      return { ...state, currentSelected: action.payload };

    case "TOGGLE_SPINNER":
      return { ...state, isLoading: action.payload };

    case "SET_MESSAGE":
      return {
        ...state,
        error: {
          ...state.error,
          isError: action.payload.isError,
          message: action.payload.message,
          type: action.payload.type,
        },
      }

    case "LOGIN_USER":
      return { ...state, isLoggedIn: true, token:action.payload.token,userCred:action.payload.userCred }

    case "LOGOUT_USER":
      // Remove token and userData from localStorage and update isLoggedIn and userCred
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      
      return { ...state, isLoggedIn: false, userCred: {} }

    default:
      // Return the current state if no action type matches
      return state;
  }
};

export { globalReducer, initialState };
