const initialState = { id: "", username: "" };
const playerMetaDataReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "SET_ID":
      return { ...state, id: payload };
    case "SET_USERNAME":
      return { ...state, username: payload };
    default:
      return state;
  }
};
export default playerMetaDataReducer;
