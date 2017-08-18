<template>
    <div class="user">
        <div class="user-label">
            <span>姓名</span>
            <span>年龄</span>
            <span>性别</span>
            <span>ID</span>
        </div>
        <ul class="user-list">
            <li v-for="(item, index) in list" class="user-item">
                <span>{{item.username}}</span>
                <span>{{item.age}}</span>
                <span>{{item.sex}}</span>
                <span>{{item.userid}}</span>
            </li>
        </ul>
        <div class="user-button">
            <span class="user-button-update" @click="updateData">添加</span>
            <span class="user-button-delete" @click="deleteData">删除</span>
        </div>
    </div>
</template>
<style lang="less">
    @import "../common";
    .user{
        min-height: 100%;
        background-color: #fff4c2;
        &-list{
            margin: 10px;
        }
        &-label, &-item{
            border-bottom: 1px solid #ccc;
            height: 100px;
            line-height: 100px;
            display: flex;
            span{
                flex: 1;
                text-align: center;
            }
        }
        &-label {
            background-color: #fc8c84;
            color: #fff;
        }
        &-button{
            padding: 80px 30px;
            display: flex;
            &-update, &-delete{
                flex: 1;
                height: 80px;
                line-height: 80px;
                text-align: center;
                background-color: #fc8c84;
                color: #fff;
            }
            &-update{
                margin-right: 10px;
            }
        }
    }
</style>
<script>
    import commonAxios from '../../libs/axiosJsonp.js';

    export default {
        data () {
            return {
                userList: [{
                    username: '张鹏',
                    age: '12',
                    sex: '男'
                }]
            };
        },
        computed: {
            list () {
                return this.userList;
            }
        },

        created () {
            this.init();
        },
        methods: {
            init () {
                this.getRankList();
            },
            getRankList () {
                commonAxios('get', {}).then(res => {
                     if (res) {
                         this.userList = res;
                     }
                 });
            },
            updateData () {
                commonAxios('update', 'username=haru&age=10&sex=女&userid=111', {
                    method: 'post',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    withCredentials:true
                }).then(res => {
                    if (res) {
                        this.userList = res;
                    }
                });
            },
            deleteData () {
                commonAxios('delete', {
                    userid: '111'
                }).then(res => {
                    if (res) {
                        this.userList = res;
                    }
                });
            },
        }
    };
</script>
