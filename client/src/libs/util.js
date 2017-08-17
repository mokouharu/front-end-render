/**
 * Created by zhj on 17/4/25.
 */
/**
 * 判断参数是否为类似数组类型
 */
const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
function isArrayLike (collection) {
  let length = collection && collection.length;
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}
/**
 * 将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组
 */
function flatten (input, shallow = false, strict = false, startIndex = 0) {
    var output = [], idx = 0;
    for (let i = startIndex, length = input && input.length; i < length; i++) {
        let value = input[i];
        if (isArrayLike(value)) {
            if (!shallow) value = flatten(value, shallow, strict);
            let j = 0, len = value.length;
            output.length += len;
            while (j < len) {
                output[idx++] = value[j++];
            }
        } else if (!strict) {
            output[idx++] = value;
        }
    }
    return output;
}
function matcher(input, target, obj = {}, key = 'type', startIndex = 0) {
    for (let i = startIndex, length = input && input.length; i < length; i++) {
        let value = input[i];
        if (target == value[key]) {
            Object.assign(obj, value);
            break;
        }
    }
    return obj;
}
function isEmptyObject(obj) {
    if(!obj)return true;
    if(typeof obj === 'object'){
        for(let index in obj){
            if(obj[index])return false;
        }
        return true;
    }
}
function isEmpty(data) {
  return data === null || data === undefined || data === '' || (data instanceof Array && !data.length) || isEmptyObject(data);
}
export {
    isArrayLike,
    flatten,
    matcher,
    isEmpty
}
