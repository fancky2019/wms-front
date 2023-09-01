<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <!-- <Card icon="log-in" :title="`欢迎登录${title}`" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">请输入用户名和密码</p>
        </div>
      </Card> -->
      <el-card >
        <div slot="header" class="clearfix">
          <span >欢迎登录{{title}}</span>
        </div>
           <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">请输入用户名和密码</p> -->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      title: config.title
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-con {
  position: relative;
  margin: 0 auto;
}
/deep/.el-card {
  background-color: transparent;
  border: none;
}
</style>
