/**
 * Created by zhj on 17/8/16.
 */

const Koa = require('koa')  // 引入一个类Koa
  , cors = require('koa2-cors')  // 跨域请求
  , controller = require('./routes/controller.js')  // 指定路由
  , json = require('koa-json')  // json格式优化
  , bodyParser = require('koa-bodyparser') // body数据解析
  , onerror = require('koa-onerror');  // 捕获错误信息

const app = new Koa(); // 创建一个koa对象做为 web app

// 跨域请求设置
app.use(cors({
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 解析body
app.use(bodyParser());

// json格式化
app.use(json());

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 指定路由
app.use(controller.routes());

//错误处理
onerror(app);
app.on('error', function(err,ctx) {
  if ((ctx.status === 404 && err.status === undefined) || err.status === 500) {
    utils.logger.error('server error', err);
    utils.logger.error(ctx);
  }
  utils.print(err);
})


app.listen(30001);
