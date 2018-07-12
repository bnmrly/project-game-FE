export function idSetterEvent(id) {
  return {
    type: 'SET_ID',
    payload: id
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
    payload: data === 'LOW' ? 1 : data === 'MEDIUM' ? 2 : 3
  };
}
