<template>
    <div class="prize " :class="{prize_fix:pageScroll}">

        <div class="task">
            <span class="detail" @click="showDetail">活动详情</span>
            <span class="winning">100%中奖</span>
            <div class="task-main">
                <div class="task1">
                    <div class="left" >
                        <div >
                            <div class="numParent" >
                                <span class="num">1</span>
                            </div>

                            <span class="mission-rewards"></span>
                            <p class="content">24元转转红包</p>
                            <p class="condition">指定商品可用</p>
                        </div>

                </div>
                    <div class="right">
                        <div v-if="!task1Complete">
                            <p class="todo">完成注册</p>
                            <button class="status" @click="register">去注册</button>
                        </div>
                        <div v-else>
                            <p class="ok"></p>
                           <p class="complete">已完成</p>
                        </div>


                    </div>
                </div>
                <div class="task2" >
                    <div class="left" :class="{leftGary:!task1Complete}">
                        <div>
                            <div class="numParent">
                                <span class="num" :class="{numGray:!task1Complete}">2</span>
                            </div>

                            <span class="mission-rewards" :class="{missionRewardsGray:!task1Complete}"></span>
                            <p class="content">10元转转红包</p>
                            <p class="condition">全平台可用</p>
                        </div>

                    </div>
                    <div class="right" :class="{rightGray:!task1Complete}">
                        <div v-if="!task1Complete">
                            <p class="todo" style="color:#b5b5b5">发布闲置</p>
                            <button class="status" :class="{btnGray:!task1Complete}">待开启</button>
                        </div>
                        <div v-else-if="task1Complete&&!task2Complete">
                            <p class="todo">发布闲置</p>
                            <button class="status" @click="publish">去发布</button>
                        </div>
                        <div v-else="task1Complete&&task2Complete">
                            <p class="ok"></p>
                            <p class="complete">已完成</p>
                        </div>


                    </div>
                </div>
                <div class="task3">
                    <div class="left">
                        <div>
                            <div class="numParent">
                                <span class="num">3</span>
                            </div>

                            <span class="missionRewards"></span>
                            <p class="content">20元现金红包</p>
                            <p class="condition">直充微信钱包</p>
                        </div>

                    </div>
                    <div class="right">
                        <div>
                            <p class="todo">???</p>
                            <button class="status">待开启</button>
                        </div>


                    </div>
                </div>
            </div>

        </div>
        <div class="guide">
            <img :src="guidePic"  style="width:100%" alt="">
        </div>
        <div class="button-bottom">
            <div class="button-bottom-fix">
                <button class="btn" @click="bottomClick">{{bottomMsg}}</button>
            </div>
        </div>
        <PopUp v-if="showDetails"  method="details" @changeMask="getState($event, $event, 333)">
            <ul>
                <li>1、完成任务即可获得相应转转红包：<br/>
                    ①通过本活动完成注册，可获得指定商品可用的转转红包，您可从指定商品中购买您喜欢的宝贝直接抵扣面值金额；<br/>
                    ②通过本活动完成闲置发布，可获得全平台可用的转转红包(除优品商品)，适用范围广、直接抵扣面值金额；<br/>
                    ③神秘任务三待开启，开启后会第一时间以系统消息通知您。
                </li><br/>
                <li>
                    2、转转红包是转转发行和认可的代金券，在转转内下单购物时可抵扣相应面值的金额，抵扣部分由转转进行补贴，具体使用规则和有效期可在“我的-红包”查看。
                </li><br/>

                <li>
                    3、每人每个任务最多可获得一次奖励，存在多账户注册、虚假发布等作弊行为将被取消资格。
                </li>


            </ul>
        </PopUp>
        <PopUp v-if="registered&&!task2Complete" >
            <p>恭喜完成第一个任务</p>
            <p>可在“我的-红包”查看红包使用详情</p>
            <p>快去完成第二个任务吧</p>
        </PopUp>
        <PopUp v-if="task1Complete&&published" >
            <p>恭喜完成第二个任务</p>
            <p>可在“我的-红包”查看红包使用详情</p>
        </PopUp>

    </div>

</template>
<style lang="less">
    @import "../common.less";
    *{
        letter-spacing:2*@px;
    }
    .prize{
        width:750*@px;
        background-color: #fbe4ce;
 }
    .prize_fix{
        position: fixed;
        top:0;
        left:0;
    }
    .detail{
        position: absolute;
        top:20*@px;
        right:0;
        background-color: #fb8274;
        color: #fff;
        border-radius:20*@px 0 0 20*@px;
        height:40*@px;
        width: 140*@px;
        text-align: center;
        line-height: 40*@px;
        font-size: 20*@px;
        letter-spacing:4*@px;

    }
    .winning{
        width:230*@px;
        text-align: center;
        color: #ffa17c;
        position: relative;
        top:256*@px;
        left:50%;
        margin-left:-115*@px;
        background-color: #fffcf9;

    }
    .task{
        position: relative;
        width:100%;
        height: 919*@px;
        background-position: 0 0;
        background:url('../../assets/prize_bg.png') no-repeat;
        background-size: 100% auto;
        background-position: 0 0;

    }
    .task-main{
        position: relative;
        top:260*@px;

    }
    .task1{
        margin:30*@px auto 0;
        width: 550*@px;
        height: 120*@px;
        position: absolute;
        left:50%;
        margin-left: -275*@px;



    }
    .numParent{
         width:52*@px;
         height: 52*@px;
         background-color: #fffbf7;
         position: absolute;
         top:50%;
         margin-top:-26*@px;
         left:-26*@px;
         box-sizing: border-box;
         padding:6*@px;
     }
    .num{
        display: block;
        text-align: center;
        color: #f96f52;
        width:38*@px;
        height: 38*@px;
        line-height: 38*@px;
        border:1px solid #f96f52;
        border-radius: 50%;
       /* position: absolute;
        top:50%;
        margin-top:-18*@px;
        left:-18*@px;*/
        background-color: #fffbf7;


    }
    .mission-rewards{
        display: block;
        width: 98*@px;
        height: 85*@px;
        position: absolute;
        top:0;
        right:20*@px;
        background: url('../../assets/mission_ rewards.png');
        background-size: 100% auto;
        background-position: 0 0;
    }

    .content{
        font-size: 30*@px;
        margin-left: 35*@px;
        /*margin-top:22*@px;*/
    }
    .condition{
        font-size: 22*@px;
        color: #b6b5b5;
        margin-left: 35*@px
    }
    .task2{
        position:absolute;
        margin:180*@px auto 0;
        width: 550*@px;
        height: 120*@px;
        left:50%;
        margin-left: -275*@px;


    }
    .task3{
        position:absolute;
        margin:330*@px auto 0;
        width: 550*@px;
        height: 120*@px;
        left:50%;
        margin-left: -275*@px;
        color:#b5b5b5;


    }
    .left{
        width: 360*@px;
        height: 120*@px;
        border: 1px solid #f96f52;
        float:left;
        position: relative;
        display: table;
    }
    .left div{
        display: table-cell;
        vertical-align: middle;
    }
    .right{
        width: 180*@px;
        height: 120*@px;
        border: 1px solid #f96f52;
        float:right;
        text-align: center;
        display: table;

    }
    .right div{
        display:table-cell;
        vertical-align: middle;
    }
    .todo{
        font-size: 26*@px;
        color:#ff7659;
       /* margin-top: 18*@px;*/
    }
    .status{
        font-size:20*@px;
        border:0;
        background-color: #ff7659;
        color:#fff;
        width: 95*@px;
        height:34*@px;
        line-height: 34*@px;
        border-radius: 17*@px;
        outline:none;
    }
    .guide{
        width:100%;
    }
    .button-bottom {
        width: 100%;
        height: 100*@px;
        background-color: #fff;
        &-fix{
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 100*@px;
            background-color: #fff;
        }

    }
    .btn{
        /*position: fixed;*/
        /*bottom: 0;*/
        /*left: 50%;*/
        border: 0;
        width:690*@px;
        height: 74*@px;
        line-height: 74*@px;
        background-color: #fd7c61;
        color:#ffffff;
        font-size:32*@px;
        text-align: center;
        margin:13*@px 30*@px;
        display:block;

    }
   /* .mask{
        position: fixed;
        filter: alpha(opacity=60);
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        left: 0;
        top: 0;
        z-index: 870618;
        height:100%;
    }
    .popup{
        left: 50%;
        margin-left: -320*@px;
        top: 50%;
        margin-top: -195*@px;
        position: fixed;
        width: 640*@px;
        height: 390*@px;
        background-color: #fff;
        text-align: center;
        font-size:32*@px;
        line-height: 45*@px;
        color:#707377;
    }
    .popup-bg{
        width:426*@px;
        height:247*@px;
        background: url('../../assets/popup_bg.png') no-repeat 0 0 ;
        position: absolute;
        top:-247*@px;
        left:50%;
        margin-left:-213*@px;
    }
    .line1{
        margin-top:60*@px;
    }
    .know{
        width:320*@px ;
        height:80*@px;
        border: 0;
        background-color:#ff5647 ;
        color:#fff;
        display: block;
        font-size: 32*@px;
        line-height:80*@px;
        margin:50*@px auto;
        border-radius: 10*@px;
    }*/
    .ok{
        margin: 0 auto;
        height:32*@px;
        width:32*@px;
        background: url('../../assets/ok.png') no-repeat center center;
        background-size: 32*@px auto;
    }
    .complete{
        font-size: 24*@px;
        color: #f96f52;
    }
    .task3 .left,.leftGary{
        border:1px solid #c9c9c9;
        color:#b5b5b5;
    }
    .task3 .right,.rightGray{
        border:1px solid #c9c9c9;
        color:#b5b5b5;
    }
    .task3 button,.btnGray{
        background-color: #dad8d7;
    }
    .task3 .missionRewards,.missionRewardsGray{
        display: block;
        width: 98*@px;
        height: 85*@px;
        position: absolute;
        top:0;
        right:20*@px;
        background: url('../../assets/waiting_open.png') no-repeat;
        background-size: 100% auto;
        background-position: 0 0;
   }
    .task3 .num,.numGray{

        color: #c9c9c9;

        border:1px solid #c9c9c9;



    }
    .task3 .todo {
        color:#b5b5b5;
    }


</style>

<script>

   import ZZAPP from '@zz/zz-jssdk';
   import isZhuanZhuan from '../../libs/isZhuanZhuan.js';
   import cookie from '../../libs/cookie';
   import axiosForGet from '../../libs/axiosJsonp.js';
   import PopUp from './popup';
   const TITLE = '有奖任务';
   const baseURL = 'https://img.58cdn.com.cn/zhuanzhuan/zzrewardtask/static/img';
   export default {
       data () {
           return {
               userState: '', // 用户状态
               guidePic: ``, // 引导图片的地址
               task1Complete: false, // 任务1是否完成
               registered: false, // 默认没有在活动页注册过
               published: false, // 默认没有在活动页发布过
               task2Complete: false, // 任务2是否完成
               showDetails: false, // 是否显示活动详情
               bottomMsg: '', // 吸底按钮的文字内容
               pageScroll: false // 默认不给主页面添加禁止滚动的类
           };
       },
       created () {
           this.init();
           window.eventHub.$on('changeMaskState', (showDetails, pageScroll) => {
               this.showDetails = showDetails;
               this.pageScroll = pageScroll;
           });
       },
       components: {PopUp},
       methods: {
           getState (showDetails, pageScroll, e) {
               alert(showDetails);
               alert(pageScroll);
               alert(e);
               this.showDetails = showDetails;
               this.pageScroll = pageScroll;
           },
           init () {
               this.setNativeConf();
               this.getUserState();
               /* 页面总的访问量 */
               this.$log('prizetask_show');
           },
           getUserState () {
               /* userState: '0 | 1 | 2' // 0 未注册 1 已注册未发布 2 注册并发布 */
               axiosForGet('getuserprizestatus', {}).then(res => {
                   if (res) {
                       this.userState = res.userState;
                       this.guidePic = `${baseURL}/guide${this.userState}.png?t=20178009`;
                       if (this.userState == '0') {
                           this.bottomMsg = '去注册';
                         /* 未注册的埋点 */
                           this.$log('unregistered_number');
                       } else if (this.userState == '1') {
                           this.task1Complete = true;
                           this.bottomMsg = '去发布';
                           /* 已经注册的埋点 */
                           this.$log('registered_number');
                       } else {
                           this.task1Complete = true;
                           this.task2Complete = true;
                           this.bottomMsg = '等待新任务开启，先去逛逛吧';
                           /* 已经注册的埋点 */
                           this.$log('registered_number');
                       }
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
           register () {
               this.$log('registered_click');
               if (isZhuanZhuan) {
                   ZZAPP.login((res) => {
                       if (res.code == 0) { // 登录/注册成功
                           this.userState = '1';
                           this.task1Complete = true;
                           this.task2Complete = false;
                           this.bottomMsg = '去发布';
                           this.guidePic = `${baseURL}/guide${this.userState}.png`;
                           this.registered = true;
                           this.pageScroll = true;
                           /* 通过页面注册成功的埋点 */
                           this.$log('page_registered_number');
                       }
                   });
               }
           },
           sendMsg () {
               ZZAPP.enterPublish({
                   type: 'prize_task'
               }, (res) => {
                   if (res.code == 0) {
                       // 给服务器端发送用户数据
                       axiosForGet('adduserproduct', {infoid: res.infoid});
                       this.userState = '2';
                       this.task1Complete = true;
                       this.task2Complete = true;
                       this.published = true;
                       this.pageScroll = true;
                       this.bottomMsg = '等待新任务开启，先去逛逛吧';
                       this.guidePic = `${baseURL}/guide${this.userState}.png`;
                       this.$log('page_publish_number');
                   }
               });
           },
           publish () {
               this.$log('publish_click');
               if (!cookie.getPPU()) { // 未登录
                // 先调登录
                   ZZAPP.login((res) => {
                       if (res.code == 0) { // 登录成功再调发布
                           this.task1Complete = true;
                           this.sendMsg();
                       }
                   });
               } else { // 登录成功,调发布，给后端发送数据
                   this.sendMsg();
               }
           },
           showDetail () {
               this.showDetails = true;
               this.pageScroll = true;
           },
           bottomClick () {
               if (this.userState === '0') {
                   this.register();
               } else if (this.userState === '1') {
                   this.publish();
               } else {
                   ZZAPP.enterHome();
               }
           }

       }
   };
</script>

