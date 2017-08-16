/**
 * Created by zhj on 17/4/26.
 */
let isEmptyObject = (obj) => {
  if(!obj)return true;
  if(typeof obj === 'object'){
    for(let index in obj){
      if(obj[index])return false;
    }
    return true;
  }
};

export default (data) => {
  return data === null || data === undefined || data === '' || (data instanceof Array && !data.length) || isEmptyObject(data);
}
