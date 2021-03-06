export function idSetterEvent(id) {
  return {
    type: 'SET_ID',
    payload: id
  };
}
export function invalidIdSetter() {
  return {
    type: 'INVALID_ID'
  };
}
export function usernameTakenSetter() {
  return {
    type: 'USERNAME_TAKEN'
  };
}
export function nameSetterEvent(name) {
  return {
    type: 'SET_NAME',
    payload: name
  };
}
export function cardSelectionEvent(data) {
  return {
    type: data,
    payload:
      data === 'LOW'
        ? { APR: 20, rating: 200 }
        : data === 'MEDIUM'
          ? { APR: 25, rating: 300 }
          : { APR: 30, rating: 400 }
  };
}
export function setUserWage(wage) {
  return {
    type: 'SET_USER_WAGE',
    payload: wage
  };
}
//turn functions can have gameEvents js file
export function increaseTurnCount() {
  return {
    type: 'INC_TURNCOUNT'
  };
}
export function resetTurnCount() {
  return {
    type: 'TURN_RESET'
  };
}
// phone component related code
export function cashChange(initialPrice) {
  return { type: 'CASH_CHANGE', payload: initialPrice };
}
export function changeAvailableCredit(initialPrice) {
  return {
    type: 'AVAILABLE_CREDIT_CHANGE',
    payload: initialPrice
  };
}
export function addToMonthlyCosts(livingCost) {
  return {
    type: 'ADD_LIVING_COST',
    payload: livingCost
  };
}
export function changeCredit({ available, max }) {
  return {
    type: 'CREDIT_CHANGE',
    payload: { available: available, max: max }
  };
}
export function resetGame() {
  return {
    type: 'RESET_GAME'
  };
}
export function changeCreditRating(direction) {
  if (direction === "up") { 
    return {
       type: 'CHANGE_CREDIT_RATING',
       payload: 100
  }
} else if(direction === "down") {
  return {
    type: 'CHANGE_CREDIT_RATING',
       payload: -100
}
  }
}

export function enableChapterChange(){
  return {
    type: 'ALLOW_NEXT_CHAPTER'
}
}

export function disableChapterChange(){
  return {
    type: 'PREVENT_NEXT_CHAPTER'
}
}