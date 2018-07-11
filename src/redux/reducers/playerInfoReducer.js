const initialState = { id: '', username: '', wallet: { cash: 0, credit: 0, rating: 0 } }
const idSelector = (state = initialState, action) => {
    const { wallet } = state;
    switch (action.type) {
        //first three cases set wallet rating.
        //the other two are for setting id and username.
        case "LOW":
            return { ...state, wallet: { ...wallet, rating: action.payload } };
        case "MEDIUM":
            return { ...state, wallet: { ...wallet, rating: action.payload } };
        case "HIGH":
            return { ...state, wallet: { ...wallet, rating: action.payload } };
        case "SET_ID":
            return { ...state, id: action.payload };
        case "SET_USERNAME":
            return { ...state, username: action.payload };
        default:
            return state;
    }
}
export default idSelector;