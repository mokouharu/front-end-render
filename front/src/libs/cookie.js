/**
 * Created by zhj on 17/4/24.
 */
import Cookies from 'js-cookie';

var customCookies = Cookies.withConverter({
    write: function (value, key) {
        return value;
    },
    read: function (value) {
        return value;
    }
});

customCookies.getPPU = function () {
    return this.get('PPU');
};
customCookies.getUID = function () {
    return this.get('uid');
};
customCookies.getToken = function () {
    return this.get('tk');
};

export default  customCookies;
