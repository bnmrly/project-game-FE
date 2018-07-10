const initialState = { cash: 0, credit: 0, rating: 0 };



 const cardSelection = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "LOW":
      return { ...state, rating: 1 };
    case "MEDIUM":
      return { ...state, rating: payload };
    case "HIGH":
      return { ...state, rating: payload };
    default:
      return state;
  }
};

const mapStateToProps = state => {
  console.log(state)
  return {
    wallet: cardSelection(state, state.cardSelectionEvent)
  }
}

export default cardSelection