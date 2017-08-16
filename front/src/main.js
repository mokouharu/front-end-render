// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import Axios from 'axios';
import VueTouch from 'vue-touch';
import VueLazyLod from 'vue-lazyload';
import Log from './libs/leStatic';
import flexible from './libs/flexible';
import Cookies from './libs/cookie';

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
            baseURL: "https://zhuan.58.com/zz/transfer/",
            // 请求超时的毫秒数
            timeout: 5000,
            // 跨域请求是否需要使用凭证
            withCredentials: true
        });

        // 获取uid
        window.UID = Cookies.getUID();
        window.TK = Cookies.getToken();
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
        // 乐高统计
        Vue.use(Log);
        Vue.use(VueTouch);

        // Vue.use(VueResource);
        VueTouch.config.swipe = {
            direction: 'horizontal'
        };
        Vue.use(VueLazyLod, {
            preLoad: 1.3,
            try: 2
        });
        // Vue.http.options.xhr = { withCredentials: true };
        // Vue.http.options.root = 'https://zhuan.58.com/';
        // Vue.http.options.root = 'http://localhost:3000';
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
            // path: '/rankList',
            path: '/',
            name: 'PrizeTask', // 个性化好卖榜单
            component (resolve) {
                require(['./components/PrizeTask/PrizeTask.vue'], resolve);
            }
        },
            {
                // path: '/rankList',
                path: '/rankList',
                name: 'rankList', // 个性化好卖榜单
                component (resolve) {
                    require(['./components/rankList/rankList.vue'], resolve);
                }
            }
        ];
    }
};

app.launch();
