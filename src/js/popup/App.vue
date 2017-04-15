<template>
  <div id="app">
    <h3>{{ title }}</h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  data () {
    return {
      title: 'reviewer-helper'
    }
  }
}
</script>

<style lang="less">
#app {
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;

  h3 {
    text-align: center;
    font-size: 20px;
  }
}
</style>
