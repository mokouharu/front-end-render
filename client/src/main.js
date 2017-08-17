// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import Axios from 'axios';
import VueTouch from 'vue-touch';
import flexible from './libs/flexible';

const app = {
    launch () {
        // meta标签和rem设置
        flexible();
        // 初始化插件
        this.initPlug();
        // 启动路由
        const routes = this.createRoutes();
        const router = new Router({
            routes
        });
        window.vm = new Vue({
            el: '#app',
            router,
            template: '<App/>',
            components: { App }
        });
        // 事件派发中心，不设计state改变的通知建议使用eventHub
        // state管理则统一使用vuex
        window.eventHub = new Vue();

        window.$axios = Axios.create({
            // 自动添加在url前面
            baseURL: "http://localhost:30001/zztest/",
            // 请求超时的毫秒数
            timeout: 5000,
            // 跨域请求是否需要使用凭证
            withCredentials: true
        });

        // 修正hash
        this.correctHashRoute();

        Object.defineProperty(document, 'setTitle', {
            value: function (t) {
                document.title = t;
                var i = document.createElement('iframe');
                i.src = '/favicon.ico';
                i.style.display = 'none';
                i.onload = function () {
                    setTimeout(function () {
                        i.remove();
                    }, 9);
                };
                document.body.appendChild(i);
            },
            writable: false,
            enumerable: false,
            configurable: false
        });
    },
    initPlug () {
        Vue.use(Router);
        Vue.use(VueTouch);

        VueTouch.config.swipe = {
            direction: 'horizontal'
        };
    },
    correctHashRoute () {
        let url = location.href,
            queryArr = [],
            queryStr = '',

            splitQuery = str => str.substring(1).split('&'),
            reg = /^(https?\:\/\/[\w\.\/]+)(\?[^#]+)?(#[^\?&]+)?(.+)?$/,
            res = reg.exec(url);
            // console.log(res);
        if (!res || !res[3]) return;

        if (res[4]) queryArr = queryArr.concat(splitQuery(res[4]));
        if (res[2]) queryArr = queryArr.concat(splitQuery(res[2]));
        if (!queryArr.length) return;

        queryArr = [...new Set(queryArr)];
        queryStr = '?' + queryArr.join('&');
        location.hash = res[3] + queryStr;
    },
    createRoutes () {
        return [{
            path: '/',
            name: 'userList', // 个性化好卖榜单
            component (resolve) {
                require(['./components/UserList/UserList.vue'], resolve);
            }
        }];
    }
};

app.launch();
