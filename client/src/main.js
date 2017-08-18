// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import Axios from 'axios';
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

        window.$axios = Axios.create({
            // 自动添加在url前面
            baseURL: "http://localhost:30001/zztest/",
            // 请求超时的毫秒数
            timeout: 5000,
            // 跨域请求是否需要使用凭证
            withCredentials: true
        });


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
    },
    createRoutes () {
        return [{
            path: '/',
            name: 'userList', // 用户列表
            component (resolve) {
                require(['./components/UserList/UserList.vue'], resolve);
            }
        }];
    }
};

app.launch();
