import Cookies from  './cookie';

let LOG_URL = 'https://lego.58.com/page/mark';

function leStatic(actiontype, backup  = {}, pagetype = "ZZ" + this.$route.name.toUpperCase()){
  // id58是nginx 生成的,即使是纯静态的html也会生成
  // uuid是后端服务生成的
  let cookieid = Cookies.getUID() || Cookies.get('id58') || Cookies.get('uuid');
  let img = new Image();
  if(backup){
      try {
          if(typeof backup == "object"){
              let ua = window.navigator.userAgent;
              backup['zztype'] = this.$route['meta']['bizType'];
              backup['zznative'] = ua.toLowerCase().indexOf('zhuanzhuan') > 0 ? 1 : 0;
              backup = JSON.stringify(backup);
          }
          img.src = LOG_URL + '?cookieid=' + cookieid + '&pagetype='+pagetype.toUpperCase()+'&actiontype=' + actiontype.toUpperCase() + '&appid=ZHUANZHUAN&_t=' + new Date().getTime()+"&backup="+encodeURIComponent(backup);
      }catch(e){}
  }else{
      img.src = LOG_URL + '?cookieid=' + cookieid + '&pagetype='+pagetype.toUpperCase()+'&actiontype=' + actiontype.toUpperCase() + '&appid=ZHUANZHUAN&_t=' + new Date().getTime();
  }
}
export default {
  install(Vue){
      Vue.prototype.$log = leStatic;
  },
  leStatic
}

