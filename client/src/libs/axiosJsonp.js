/**
 * Created by zhj on 17/6/27.
 */
import JSONP from 'jsonp';


const getJsonp = (url, params = {}, opts) => {
    let query = url.indexOf('?') === -1 ? '?' : '&';
    query += Object
        .keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
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

const post = (url, params = '', opts) => $axios.post(url, params, opts)
  .then(res => res.data)
  .then(res => {
      console.log('res:', res);
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
    const { cors, method } = opts || {};
    if (method) {
        return post(url, params, opts);
    }
    return cors ? getJson(url, params, opts) : getJsonp(url, params, opts);
};