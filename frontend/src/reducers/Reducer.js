
const initialState = {
  isLoggedIn: false,
  currentSelected: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
      case "SET_CURRENT_SELECTED":
      return { ...state, currentSelected: action.payload };
    default:
      return state;
  }
};

export { reducer, initialState }