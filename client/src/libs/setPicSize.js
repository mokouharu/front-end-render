/**
 * Created by zhj on 17/4/24.
 */
export default (url, _width, _height) => {
    if (isArray(url)) {
        return url.map(function (item) {
            return logic(item, _width, _height);
        });
    }
    return logic(url, _width, _height);
};

function logic (url, _width, _height) {
    if (!url) {
        return false;
    }
    if (!/^https:/.test(url)) {
        url = url.replace(/http/, 'https');
    }
    // 微信头像
    if (/wx\.qlogo\.cn/.test(url)) {
        return wxImg(url);
    } else if (/^https:\/\/pic/.test(url)) { // 已经有协议
        return resetPic(url, _width, _height);
    } else if (!(url.indexOf('http') > -1)) {   // 没有协议的图片
        return addHttp(url, _width, _height);
    } else if (url.indexOf('https://zzpic') > -1) { // 其他
        return doMake(url, _width, _height);
    }
    return url;
}

function doMake (url, _width, _height) {
    if (/.\?./.test(url)) {
        url = url.substr(0, url.indexOf('?'));
    }
    if (_width && _height) {
        return `${url}?w=${_width}&h=${_height}`;
    } else if (_width && !_height) {
        return url + '?w=' + _width;
    }
    return url;
}

function wxImg (url) {
    let _index = url.lastIndexOf('/');
    return url.substr(0, _index) + '/96';
}

function resetPic (url, width, height) {
    let _url = '';
    let matchRule = /_\d+_\d+(\.png$|\.jpg$|\.gif$|\.jpeg$|\.bmp$|\.pic$)/i;
    if (matchRule.test(url)) {
        let bott = matchRule.exec(url)[0];
        let dot = bott.lastIndexOf('.');
        let suf = bott.substr(dot, bott.length - 1);
        let reg = new RegExp(bott);
        _url = url.replace(reg, '') + suf;
    } else {
        _url = url;
    }
    return doMake(_url, width, height);
}

function addHttp (url, width, height) {
    let _url = '';
    let random = Math.ceil(Math.random() * 8);
    _url = `https://pic${random}.58cdn.com.cn/zhuanzh/${(/^\//g.test(url.trim()) ? url.substr(1) : url)}`;
    return doMake(_url, width, height);
}

function isArray (obj) {
    return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]';
}
