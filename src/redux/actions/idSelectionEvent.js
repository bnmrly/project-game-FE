 function idSelectionEvent(id){
     console.log(id, "***")
    return {
        type : 'id',
        payload:id
    }
}
export default idSelectionEvent;