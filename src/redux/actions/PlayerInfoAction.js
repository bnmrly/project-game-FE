export function idSetterEvent(id) {
  return {
    type: "SET_ID",
    payload: id
  };
}
export function usernameSetterEvent(username) {
  return {
    type: "SET_USERNAME",
    payload: username
  };
}
export function cardSelectionEvent(data) {
  return {
    type: data,
    payload: data === "LOW" ? 1 : data === "MEDIUM" ? 2 : 3
  };
}
export function setUserWage(wage) {
  return {
    type: "SET_USER_WAGE",
    payload: wage
  };
}
export function increaseTurnCount() {
  return {
    type: "INC_TURNCOUNT"
  };
}
export function resetTurnCount() {
  return {
    type: "TURN_RESET"
  };
}
