const initialState = {
  wallet: { cash: 2000, credit: { available: 184, max: 200 }, rating: 300 },
  wage: 0
};
const playerFinancialReducer = (state = initialState, action) => {
  const { wallet } = state;
  //
  switch (action.type) {
    case "LOW":
      return { ...state, wallet: { ...wallet, rating: action.payload } };
    case "MEDIUM":
      return { ...state, wallet: { ...wallet, rating: action.payload } };
    case "HIGH":
      return { ...state, wallet: { ...wallet, rating: action.payload } };
    case "SET_USER_WAGE":
      return { ...state, wage: action.payload };
    default:
      return state;
  }
};
export default playerFinancialReducer;
