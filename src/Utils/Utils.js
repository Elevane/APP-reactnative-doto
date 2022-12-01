


const isOk = (Object) => {
    return Object === null || Object === undefined || Object == null || Object == undefined || !isValidJson(Object) ? false : true;
}
const isValidJson = (o) => {
    try{
        JSON.parse(o)
        return true;
    }
    catch(e){
        return false;
    }
}
export default {isOk}