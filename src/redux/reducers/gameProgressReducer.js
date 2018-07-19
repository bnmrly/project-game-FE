const initialState = { turn_count: 1, nextChapterDisabled: true };
const gameProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC_TURNCOUNT':
      return { ...state, turn_count: state.turn_count + 1 };
    case 'TURN_RESET':
      return { ...state, turn_count: 1 };
    case 'RESET_GAME':
      return initialState;
    case 'ALLOW_NEXT_CHAPTER':
      return { ...state, nextChapterDisabled: false}
    case 'PREVENT_NEXT_CHAPTER':
      return {...state, nextChapterDisabled: true}
    default:
      return state;
  }
};
export default gameProgressReducer;
