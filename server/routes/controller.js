/**
 * Created by zhj on 17/8/17.
 */

const Router = require('koa-router')
    , tarMongoose = require('../models/common.js');

const router = new Router({
  prefix: '/zztest'
});

const errorResData = msg => {
  return { respCode: "-1", respData: msg };
};
const setCallback = (cb, data) =>  `${cb}(${JSON.stringify(data)})`;
const setResData = (data, msg) => {
  if (data.type) {
   return {
      respCode: "0",
      respData: data.data
    };
  }
  return errorResData(msg);
};

let originData = [];

var map = {
  update: async (ctx) => {
    let reqData = ctx.request.body
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
    const data = await tarMongoose.query();
    ctx.body = setResData(data, '数据更新失败!');
  },

  delete: async (ctx) => {
    let resData;
    if(ctx.query.userid){
      await tarMongoose.delete({ userid: ctx.query.userid });
      const data = await tarMongoose.query();
      resData = setResData(data, '数据删除失败!');
    }
    ctx.body = setCallback(ctx.query.callback, resData);
  },

  get: async (ctx) => {
    //查询全部记录
    const data = await tarMongoose.query();
    let resData = setResData(data, '查询数据库错误!');
    originData = data.data;
    ctx.body = setCallback(ctx.query.callback, resData);
  },

  getUserId: async (ctx) => {
    let id = ctx.query.userid ? ctx.query.userid : "";
    //基于ID的查询
    const data = await tarMongoose.queryByUserId(id);
    let resData = setResData(data, '查询数据库错误!');
    ctx.body = setCallback(ctx.query.callback, resData);
  }
};

router
  .post('/update', map.update)
  .get('/delete', map.delete)
  .get('/get', map.get)
  .get('/getUserId', map.getUserId)

module.exports = router;