<template>
  <div id="app">
    <application msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Application from './components/Application.vue'

export default {
  name: 'app',
  components: {
    Application
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
