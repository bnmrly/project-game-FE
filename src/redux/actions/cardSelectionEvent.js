export default function cardSelectionEvent(data) {
  return {
    type: data,
    payload: data === "LOW" ? +1 : data === "MEDIUM" ? +2 : +3
  };
}
