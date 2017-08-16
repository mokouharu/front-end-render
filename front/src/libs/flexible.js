/**
 * Created by zhj on 17/4/21.
 */
let doc = document,
    docEl = doc.documentElement,
    metaEl = doc.querySelector('meta[name="viewport"]'),
    isIPhone = window.navigator.appVersion.match(/iphone/gi),
    devicePixelRatio = window.devicePixelRatio,
    tid;
// 刷新REM
function refreshRem() {
  var width = docEl.getBoundingClientRect().width;

  var fontSize = width / 320 * 16;
  docEl.style.fontSize = fontSize + 'px';

  var effectSize = parseFloat(getComputedStyle(docEl).fontSize);
  if (effectSize != fontSize) //fix：华为荣耀、魅族m1 note、三星Note4等手机内置webview会自动对设置的font-size乘一个系数，导致页面偏大（Font Boosting）
    docEl.style.fontSize = fontSize*fontSize/effectSize + 'px';
}
function createViewport() {
  var dpr;
  if (isIPhone) {
    // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
    if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
      dpr = 3;
    } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
      dpr = 2;
    } else {
      dpr = 1;
    }
  } else {
    // 其他设备下，仍旧使用1倍的方案
    dpr = 1;
  }
  var scale = 1 / dpr;
  metaEl = doc.createElement('meta');
  metaEl.setAttribute('name', 'viewport');
  metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  docEl.firstElementChild.appendChild(metaEl);
}
//1px fix js
function fixOnePx() {
  if(isIPhone){
    var hairClass = "notHairlines";
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
        version = parseInt(v[1], 10);
    if (version >= 8) {
      hairClass = 'hairlines';
    }
    document.documentElement.classList.add(hairClass);
  }
}

// 启动函数
export default function () {
  createViewport();
  refreshRem();
  fixOnePx();
  window.addEventListener('resize', function () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 100);
  }, false);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 100);
    }
  }, false);
}
