export function setLS(key, value){
    localStorage.setItem(key, value);
}

export function getLS(key){
    let ls = localStorage.getItem(key);

    if(ls === 'true'){
        return true;
    }

    else if (ls === 'false'){
        return false;
    }

    else if(!isNaN(parseInt(ls))){
        return parseInt(ls);
    }

    else{
        return localStorage.getItem(key)
    }
}
