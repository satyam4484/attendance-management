
const initialState = {
  isLoggedIn: false,
  currentSelected: 0,
};

const globalReducer = (state, action) => {
  switch (action.type) {
      case "SET_CURRENT_SELECTED":
      return { ...state, currentSelected: action.payload };
    default:
      return state;
  }
};

export { globalReducer, initialState }