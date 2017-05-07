<template>
  <div class="page-room">
    <p>您当前的野狗ID为:</p>
    <p class="sub">{{ id }}</p>
    <p>您的用户ID为:</p>
    <p class="sub">{{ uid }}</p>
    <router-link class="router" to="/register/edit">修改野狗ID</router-link>
  </div>
</template>

<script>
import { getStorage } from '../utils'

export default {
  name: 'room',

  data () {
    return {
      id: '',
      uid: ''
    }
  },

  created () {
    getStorage('id').then(res => { this.id = res.id })
    getStorage('uid').then(res => { this.uid = res.uid })
  }
}
</script>

<style lang="less">
.page-room {
  p {
    padding: 0;
    margin: 0;
    padding-left: 10px;
    font-size: 20px;

    &.sub {
      margin: 10px 20px;
      color: #19d4ae;
    }
  }

  .router {
    font-size: 20px;
    color: #58b7ff;
    text-decoration: none;
    margin-left: 10px;
  }
}
</style>
