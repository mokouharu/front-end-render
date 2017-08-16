<template>
    <div class="mask" :class="{hide:is_hide}">
        <div :class="['popup', {'details': details}]" >
            <div class="popup-bg"></div>
            <div class="popcontent">
                <slot></slot>

                <button v-if="!details" class="know" @click="know">我知道了</button>
                <div class="btnParent" v-else>
                    <div class="btnFixed">
                        <button  class="know" @click="know">我知道了</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    @import "../common.less";
    .mask{
        position: fixed;
        filter: alpha(opacity=60);
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        left: 0;
        top: 0;
        z-index: 870618;
        height:100%;
        display: block;
    }
    .popup{


    }
    .popup p:first-child{
        margin-top:60*@px;
    }
    .popup-bg{
        width:426*@px;
        height:247*@px;
        background: url('../../assets/popup_bg.png') no-repeat 0 0 ;
        background-size: 100% auto;
        position: absolute;
        top:275 *@px;
        left:50%;
        margin-left:-213*@px;
    }
    .popcontent{
        left: 50%;
        margin-left: -320*@px;
        top:480*@px;
        /*margin-top: -195*@px;*/

        position: absolute;
        width: 640*@px;
       /* height: 390*@px;*/
        background-color: #fff;
        text-align: center;
        font-size:32*@px;
        line-height: 45*@px;
        color:#707377;
        padding:5*@px;
        border-radius: 15*@px;
        /* overflow-y: auto; */
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
        text-align: center;
    }
    .hide{
        display: none;
    }
    .details{
        text-align: left;
        font-size: 26*@px;
        /*ul li{
            list-style-type:demical;
            list-style-position:outside;
        }*/
        .popup-bg{
            width:426*@px;
            height:247*@px;
            background: url('../../assets/popup_bg.png') no-repeat 0 0 ;
            background-size: 100% auto;
            position: absolute;
            top:45 *@px;
            left:50%;
            margin-left:-213*@px;
        }
        .popcontent{
            height:700 *@px;
            left: 50%;
            top: 250*@px;
            padding: 35 *@px 35*@px 0;
            margin-top: 0;
            text-align: left;
            box-sizing: border-box;
            overflow-y: auto;
        }
        .btnParent{
            width:100%;
            height:120*@px;
            /*margin-bottom:30*@px;*/


        }
        .btnFixed{
            width:570*@px;
            height:80*@px;
            background-color: #fff;
            position: fixed;
            top:830*@px;
            padding:20*@px 0;
        }
        .know{

            margin:0 auto 0;
            ;
        }
    }

</style>
<script>
    export default {
        data () {
            return {
                details: '',
                is_hide: false
            };
        },
        props: ['method', 'changeMask'],
        computed: {

        },
        created () {
            if (this.method == 'details') {
                this.details = true;
            } else {
                this.details = false;
            }
        },
        methods: {
            know () {
                this.is_hide = true;
                this.$emit('changeMask', false, false);
            }
        }
    };
</script>
