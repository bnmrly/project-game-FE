const initialState = { cash: 0, credit: 0, rating: 0 };

export default (cardSelection = (state = initialState, action) => {
  const payload = action.payload.value;
  switch (action.type) {
    case "LOW":
      return { ...state, rating: payload };
    case "MEDIUM":
      return { ...state, rating: payload };
    case "HIGH":
      return { ...state, rating: payload };
    default:
      return state;
  }
});
