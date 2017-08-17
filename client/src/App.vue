<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
html {
  -webkit-tap-highlight-color:transparent;
}
body{
  /*background-color: #f2dbce;*/
  color:#000;
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}
body,html{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
a{
  text-decoration:none;
}
i,em{
  font-style: normal;
}
em{
  font-weight: bold;
}
ul,li,p,textarea,h1,h2,h3,h4{
  list-style-type:none;
  margin: 0;
  padding: 0;
}
html,div,p,ul,li,form,span {
  user-select:none;
  word-wrap:break-word;
  word-break:break-all;
}
</style>
