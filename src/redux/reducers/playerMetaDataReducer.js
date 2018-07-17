const initialState = { id: '', name: '' };
const playerMetaDataReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case 'SET_ID':
      return { ...state, id: payload };
    case 'SET_NAME':
      return { ...state, name: payload };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};
export default playerMetaDataReducer;
