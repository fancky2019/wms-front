<template>
  <el-form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <el-form-item prop="userName">
      <el-input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <i :size="16" class="el-icon-user-solid"></i>
        </span>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <i :size="14" class="el-icon-lock"></i> 
        </span>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="width:100%;margin-bottom:10px;" @click.native.prevent="handleSubmit" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import md5 from 'js-md5'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: md5(this.form.password)
          })
        }
      })
    }
  }
}
</script>
