
const Koa = require('koa')  // 创建一个koa实例
  , cors = require('koa2-cors')  // 跨域请求
  , controller = require('./routes/controller.js')  // 指定路由
  , json = require('koa-json')  // json格式优化
  , bodyParser = require('koa-bodyparser') // body数据解析
  , onerror = require('koa-onerror');  // 日志

const app = new Koa();

app.use(cors({
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
// 解析body
app.use(bodyParser());

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
