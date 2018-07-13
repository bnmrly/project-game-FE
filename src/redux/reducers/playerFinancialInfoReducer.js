const initialState = {
  wallet: {
    cash: 2000,
    credit: { available: 184, max: 200 },
    rating: 300
  },
  living_costs: {
    groceries: 50,
    miscellaneous: 40,
    travel: 30
  },
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
