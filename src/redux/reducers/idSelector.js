const initialState = { id: null, name: null };

const idSelector = (state = initialState, action) => {
  if (action.type === 'id') {
    return { ...state, id: action.payload };
  } else {
    return state;
  }
};
export default idSelector;
