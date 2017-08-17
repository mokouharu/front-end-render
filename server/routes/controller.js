/**
 * Created by zhj on 17/8/16.
 */

var Router = require('koa-router');
const tarMongoose = require('../models/common.js');
var router = new Router({
  prefix: '/zztest'
});
const setCallback = (cb, data) =>  `${cb}(${JSON.stringify(data)})`;
let originData = [];

var map = {
  get: async (ctx) => {
    //查询全部记录
    let data = await tarMongoose.query();
    let resData = { respCode: "-1", respData: "查询数据库错误!" };
    if (data.type) {
      resData = {
        respCode: "0",
        respData: data.data
      };
    }
    originData = data.data;
    ctx.body = setCallback(ctx.query.callback, resData);
  },
  update: async (ctx) => {
      let resData = { respCode: "-1", respData: "数据更新失败!" };
      let reqData = ctx.request.body;
      let data
        , isFound = false;
      for (let item of originData) {
        if (reqData.userid == item.userid) {
          isFound = true;
          break;
        }
      }
      if (isFound) {
        let _id = reqData.userid;
        delete reqData.userid;
        await tarMongoose.update({ userid: _id }, reqData);
      } else {
        await tarMongoose.add(reqData);
      }
      data = await tarMongoose.query();
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
    const data = await tarMongoose.queryByUserId(id);
    if(data.type){
      resData = {
        respCode: "0",
        respData: data.data
      };
    }
    ctx.body = setCallback(ctx.query.callback, resData);
  },
  delete: async (ctx) => {
    let resData = {respCode:"-1",respData:"数据删除失败!"};
    if(ctx.query.userid){
      await tarMongoose.delete({ userid: ctx.query.userid });
      const data = await tarMongoose.query();
      if (data.type) {
        resData = {
          respCode: "0",
          respData: data.data
        };
      }
    }
    ctx.body = setCallback(ctx.query.callback, resData);
  }
};

router
  .get('/get', map.get)
  .post('/update', map.update)
  .get('/getUserId', map.getUserId)
  .get('/delete', map.delete)

module.exports = router;