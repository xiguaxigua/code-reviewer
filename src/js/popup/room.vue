<template>
  <div class="page-room">
    <p>野狗ID: {{ id }}</p>
    <p>用户ID: {{ uid }}</p>
    <p v-if="type === 'admin'">
      是否review当前页面：
      <el-switch
        v-model="state"
        on-text="开启"
        off-text="关闭">
      </el-switch>
    </p>
    <p v-else-if="type === 'user' && pageState">
      是否同步当前页面：
      <el-switch
        v-model="onReview"
        on-text="开启"
        off-text="关闭">
      </el-switch>
    </p>
    <p v-else>
      进入正在review的页面
      <el-button @click="jump" size="small">跳转</el-button>
    </p>
    <router-link class="router" to="/register/edit">修改野狗ID</router-link>
  </div>
</template>

<script>
import { getStorage, setStorage, addListener } from '../utils'

export default {
  name: 'room',

  data () {
    return {
      id: '',
      uid: '',
      state: false,
      type: '',
      pageState: false,
      onReview: false
    }
  },

  watch: {
    state (v) {
      setStorage('state', v)
    },

    onReview (v) {
      setStorage('onReview', v)
    }
  },

  methods: {
    jump () {
      setStorage('jump', '1')
    }
  },

  created () {
    getStorage('id').then(res => { this.id = res.id })
    getStorage('uid').then(res => { this.uid = res.uid })
    getStorage('type').then(res => { this.type = res.type })
    getStorage('state').then(res => { this.state = res.state })
    getStorage('onReview').then(res => { this.onReview = res.onReview })
    getStorage('pageState').then(res => { this.pageState = res.pageState })
    addListener(changes => {
      if (changes.pageState) this.pageState = changes.pageState.newValue
    })
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
