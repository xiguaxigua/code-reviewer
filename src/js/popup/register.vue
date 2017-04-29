<template>
  <div class="page-register">
    <div class="form-item">
      <label>野狗应用ID: </label>
      <el-input v-model="id" @keyup.enter="confirm"></el-input>
    </div>
    <el-button type="primary" @click="confirm">确认</el-button>
  </div>
</template>

<script>
import { setStorage, getStorage, addListener } from '../utils'

export default {
  name: 'register',

  data () {
    return {
      id: 'code-reviewer'
    }
  },

  methods: {
    confirm () {
      getStorage('id').then(res => {
        console.log('id', res)
      })
      setStorage('id', this.id)
    }
  },

  created () {
    addListener((changes, namespace) => {
      console.log('监听修改')
      console.log(changes, namespace)
    })
    getStorage('uid').then(res => {
      console.log('uid', res)
    })
  }
}
</script>

<style lang="less">
.page-register {
  padding: 0 20px;
  text-align: center;

  .el-button {
    margin-top: 20px;
  }

  .form-item {
    display: flex;
    text-align: left;

    label {
      white-space: nowrap;
      line-height: 30px;
      font-size: 18px;
    }

    .el-input {
      width: 150px;
      margin-left: 10px;
    }
  }
}
</style>

