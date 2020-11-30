<template>
  <div id="app">
    <router-view></router-view>
    <!-- <el-divider style=" margin: 0px 70px 0px 70px;" class="line"></el-divider> -->
  </div>
</template>

<script>
// import Application from './components/Application.vue'

export default {
  name: "app",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
