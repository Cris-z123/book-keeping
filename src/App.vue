<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

// 解决数据为基本类型时值传递的问题

// import store from './store/index2.js;

// export default {
//   data() {
//     return {      store: store
//     }
//   }
// }


<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 16px;
  font-family: $font-hei;
  line-height: 1.5;
  background: #f5f5f5;
}
#app {
  max-width: 500px;
  margin: 0 auto;
}
</style>
