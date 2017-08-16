/**
 * Created by zhj on 17/8/16.
 */

var Router = require('koa-router');
const tarMongoose = require('../models/common.js');
var router = new Router({
  prefix: '/zztest'
});

var map = {
  get: async (ctx) => {
    //查询全部记录
    let data = await tarMongoose.query();
    console.log(data);
    let resData = { respCode: "-1", respData: "查询数据库错误!" };
    if (data.type) {
      resData = {
        respCode: "0",
        respData: data.data
      };
    }
    ctx.body = resData;
  },
  update: async (ctx) => {
      let resData = { respCode: "-1", respData: "数据更新失败!" };
      let reqData = ctx.request.body;
      let data;
      console.log('reqData:', reqData);
      if (reqData.userid) {
        let _id = reqData.userid;
        delete reqData.userid;
        data = await tarMongoose.update({ userid: _id }, reqData);
      } else {
        data = await tarMongoose.add(reqData);
      }
      if (data.type) {
        resData = {
          respCode: "0",
          respData: data.data
        };
      }
      ctx.body = resData;
  },
  getUserId: async (ctx) => {
    let resData = {respCode:"-1",respData:"查询数据库错误!"};
    let id = ctx.query.userid ? ctx.query.userid : "";
    //基于ID的查询
    let data = await tarMongoose.queryByUserId(id);
    if(data.type){
      resData = {
        respCode: "0",
        respData: data.data
      };
    }
    ctx.body = resData;
  },
  delete: async (ctx) => {
    let resData = {respCode:"-1",respData:"数据删除失败!"};
    if(ctx.query.userid){
      let data = await tarMongoose.delete({ userid: ctx.query.userid });
      if (data.type) {
        resData = {
          respCode: "0",
          respData: data.data
        };
      }
    }
    ctx.body = resData;
  }
};

router
  .get('/get', map.get)
  .post('/update', map.update)
  .get('/getUserId', map.getUserId)
  .get('/delete', map.delete)

module.exports = router;