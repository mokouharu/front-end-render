/**
 * Created by zhj on 17/6/27.
 */
import JSONP from 'jsonp';


const getJsonp = (url, params = {}, opts) => {
    let query = url.indexOf('?') === -1 ? '?' : '&';
    query += Object
        .keys(params)//获取对象自身所有的可枚举的属性名，返回一个由属性名组成的数组
        .map(key => `${key}=${encodeURIComponent(params[key])}`)//返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组
        .join('&');//拼接参数字符串
    return new Promise((resolve, reject) => {
        JSONP(`${$axios.defaults.baseURL}${url}${query}`, opts, (error, res) => {
            if (error) throw error;
            if (!error && res.respCode == 0) {
                resolve(res.respData);
            } else {
                reject(res.errMsg);
            }
        })
    })
};

const getJson = (url, params = {}, opts) => $axios.get(url, {
    params
})
.then(res => res.data)
.then(res => {
    return new Promise((resolve, reject) => {
        const {respCode, respData, errMsg} = res;
        if (respCode == 0) {
            resolve(respData);
        } else {
            reject(errMsg)
        }
    })
})
.catch(error => {
    if (error.response) {
        //请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);
    } else {
        //一些错误是在设置请求的时候触发
        console.log('Error',error);
    }
});

export default (url, params = {}, opts) => {
    const { cors } = opts || {};
    return cors ? getJson(url, params, opts) : getJsonp(url, params, opts);
};