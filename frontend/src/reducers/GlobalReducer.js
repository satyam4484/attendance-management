
const initialState = {
  currentSelected: 0,
  isLoading: false,
  error: { isError: false, message: "", type: "error" },
};

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

    default:
      return state;
  }
};

export { globalReducer, initialState }