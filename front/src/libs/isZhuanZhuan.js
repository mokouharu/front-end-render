/**
 * Created by zhj on 17/5/4.
 */
export default (function () {
  const ua = window.navigator.userAgent;
  return ua.toLowerCase().indexOf('zhuanzhuan') > 0;
})();
