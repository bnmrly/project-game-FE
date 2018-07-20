const initialState = {
  id: '',
  name: '',
  invalidIdAttempt: false,
  usernameTaken: false
};
const playerMetaDataReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case 'SET_ID':
      return { ...state, id: payload };
    case 'SET_NAME':
      return { ...state, name: payload };
    case 'RESET_GAME':
      return initialState;
    case 'INVALID_ID':
      return { ...state, invalidIdAttempt: true };
    case 'USERNAME_TAKEN':
      return { ...state, usernameTaken: true };
    default:
      return state;
  }
};
export default playerMetaDataReducer;
