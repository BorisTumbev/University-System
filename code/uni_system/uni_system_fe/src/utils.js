export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const recompose = (obj,string) => {
    var parts = string.split('.');
    var newObj = obj[parts[0]];
    if(parts[1]){
        parts.splice(0,1);
        var newString = parts.join('.');
        return recompose(newObj,newString);
    }
    return newObj;
}
