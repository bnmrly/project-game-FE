const initialState = {
  wallet: { cash: 500, credit: { available: 0, max: 0 }, rating: 0 },
  wage: 0
};
const playerFinancialReducer = (state = initialState, action) => {
  const { wallet, living_costs } = state;
  const {
    wallet: { credit }
  } = state;
  //
  switch (action.type) {
    case 'LOW':
      return { ...state, wallet: { ...wallet, rating: action.payload } };
    case 'MEDIUM':
      return { ...state, wallet: { ...wallet, rating: action.payload } };
    case 'HIGH':
      return { ...state, wallet: { ...wallet, rating: action.payload } };
    case 'SET_USER_WAGE':
      return { ...state, wage: action.payload };
    case 'CASH_CHANGE':
      return {
        ...state,
        wallet: { ...wallet, cash: wallet.cash - action.payload }
      };
    case 'CREDIT_CHANGE':
      return {
        ...state,
        wallet: {
          ...wallet,
          credit: { ...credit, available: credit.available - action.payload }
        }
      };
    case 'ADD_LIVING_COST':
      const newLivingState = { ...living_costs, ...action.payload };
      return { ...state, living_costs: newLivingState };

    default:
      return state;
  }
};
export default playerFinancialReducer;
