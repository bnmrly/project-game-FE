const initialState = { turn_count: 1 };

const gameProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INC_TURNCOUNT":
      return { ...state, turn_count: state.turn_count + 1 };
    case "TURN_RESET":
      return { ...state, turn_count: 1 };
    default:
      return state;
  }
};
export default gameProgressReducer;
