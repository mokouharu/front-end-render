<template>
    <div class="rank">
        <div class="rank-bg"></div>
        <div class="rank-desc">
            <div class="rank-desc-title">
                <p v-if="interests.length > 0">喜欢<em>{{interests}}</em>的小伙伴们都想买这些宝贝, 现在去发布更易卖出哟!</p>
                <p v-else>小伙伴们都想买这些宝贝, 现在去发布更易卖出哟!</p>
            </div>
            <ul class="rank-desc-list">
                <li v-for="(item, index) in rankList" class="rank-desc-list-item bbOnepx" @click="enterPublish(item)">
                    <img :src="options.starImgs[index]">
                    <div class="content">
                        <p>{{item.cateName}} <i :class="{flag: index < 3 }"></i></p>
                        <span>{{item.counts}}小伙伴{{options.defaultText[index]}}</span>
                    </div>
                </li>
            </ul>
            <div class="placeholder"></div>
        </div>
        <button class="rank-btn" type="button" @click="test('event是什么:', 1)">马上卖宝贝赚钱</button>
    </div>
</template>
<style lang="less">
    @import "../common";
    .rank {
        background-color: #f1dbce;
        position: relative;
        height: 100%;
        margin-bottom: 100 *@px;
        &-bg{
            width: 100%;
            height: 286 *@px;
            background: url("../../assets/head_bg.jpg") no-repeat;
            background-size: 100% auto;
            background-position: 0 0;
            &::before {
                content: '';
                position: absolute;
                top: 110 *@px;
                right: 110 *@px;
                width: 170 *@px;
                height: 148 *@px;
                background: url("../../assets/bear_logo.png") no-repeat;
                background-size: 100% auto;
                background-position: 0 0;
            }
            &::after {
                content: '';
                position: absolute;
                top: 220 *@px;
                right: 130 *@px;
                width: 140 *@px;
                height: 148 *@px;
                background: url("../../assets/bear_leg.png") no-repeat;
                background-size: 100% auto;
                background-position: 0 0;
                z-index: 300;
            }
        }

        &-desc {
            position: absolute;
            top: 250 *@px;
            margin: 0 28 *@px 0 *@px 28 *@px;
            border-top: 12 *@px solid #a45935;
            background-color: #fff;
            font-size: 24 *@px;
            width: 92%;
            &-title{
                margin: 20 *@px;
                padding: 20 *@px 20 *@px 20 *@px 30 *@px;
                border-radius: 10 *@px;
                color: #965533;
                background-color: #feeed5;
                em {
                    color: #ff6224;
                }
            }
            &-list{
                padding: 6 *@px 45 *@px;
            }
            &-list-item {
                display: flex;
                padding: 22 *@px 0;
                border-bottom: 1px solid #ccc;
                &:last-child{
                    border-bottom: none;
                }
                img {
                    width: 50 *@px;
                    height: 50 *@px;
                    margin-top: 10 *@px;
                }
                .content {
                    flex: 1;
                    margin-left: 26 *@px;
                    font-size: 30 *@px;
                    p {
                        .flag {
                            display: inline-block;
                            content: '';
                            width: 24 *@px;
                            height: 30 *@px;
                            background: url("../../assets/fire_logo.png") no-repeat;
                            background-size: 100% auto;
                            background-position: 0 0;
                            vertical-align: -2px;
                        }
                    }
                    span {
                        font-size: 20 *@px;
                        color: #999;
                    }
                }
                &::after {
                    content: '';
                    display: inline-block;
                    width: 130 *@px;
                    height: 50 *@px;
                    background: url("../../assets/post_btn.png") no-repeat;
                    background-size: 100% auto;
                    background-position: 0 0;
                    margin-top: 16 *@px;

                }
            }
        }
        .placeholder{
            width: 100%;
            height: 100 *@px;
            background-color: #f1dbce;
        }
        &-btn{
            position: fixed;
            bottom: 0;
            width: 100%;
            display: block;
            background-color: #ff6224;
            height: 86*@px;
            line-height: 86*@px;
            border: 0;
            outline: none;
            color: #fff;
            font-size: 32 * @px;
        }
    }
</style>
<script>
    import OPTIONS from './options.js';
    import ZZAPP from '@zz/zz-jssdk';
    import isZhuanZhuan from '../../libs/isZhuanZhuan.js';
    import axiosForGet from '../../libs/axiosJsonp.js';

    const TITLE = '转转赚钱攻略';

    export default {
        data () {
            return {
                commonInterests: [],
                options: OPTIONS,
                list: []
            };
        },
        computed: {
            interests () {
                return this.commonInterests.join('、');
            },
            rankList () {
                return this.list;
            }
        },
        created () {
            this.init();
        },
        methods: {
            init () {
                this.setNativeConf();
                this.getRankList();
                this.$log(`publish_show`);
            },
            getRankList () {
                // axiosForGet('getpersonalizedlist', {uid: window.UID, token: window.TK}).then(res => {
                //     if (res) {
                //         this.commonInterests = res.commonInterests;
                //         this.list = res.rankList;
                //     }
                // });
                // console.log(getpersonalizedlist);
                axiosForGet('getpersonalizedlist', {uid: '49046806768397', token: '313D638202837A4604CF2B7801323056'}).then(res => {
                    if (res) {
                        console.log(res);
                        this.commonInterests = res.commonInterests;
                        this.list = res.rankList;
                    }
                });
            },
            setNativeConf () {
                if (isZhuanZhuan) {
                    ZZAPP.setTitle({
                        title: TITLE
                    });
                } else {
                    document.title = TITLE;
                }
            },
            test (msg, e) {
                alert(msg + e);
            },
            enterPublish (item = {}) {
                if (isZhuanZhuan) {
                    this.$log(`publish_click`, {cateId: `rank${item.cateId || ''}`});
                    ZZAPP.enterPublish({
                        cateId: item.cateId || '',
                        cateName: item.cateName || '',
                        type: `ZZRANKLIST_PUBLISHED`
                    });
                } else {
                    alert('只有在转转内才能发布哟~');
                }
            }
        }
    };
</script>
