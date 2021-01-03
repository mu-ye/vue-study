<template>
  <div class="main">
    <a-tabs defaultActiveKey="login" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
      <a-tab-pane key="login" tab="帐号密码登录">
        <a-form-model :model="form" :rules="rules" ref="ruleForm">
          <a-form-model-item prop="username">
            <a-input v-model="form.username" allowClear :maxLength="20" placeholder="帐号：请输入帐号" size="large">
              <a-icon slot="prefix" type="user" :style="{ color: '#1890FF' }" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input-password v-model="form.password" allowClear placeholder="密码：请输入密码" size="large">
              <a-icon slot="prefix" type="lock" theme="twoTone" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item>
            <a-button block :loading="loading" size="large" type="primary" @click="handleSubmit">
              登录
            </a-button>
            <a-button block size="large" style="margin-top: 24px" @click="handleHome">
              首页
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// import SHA256 from 'crypto-js/sha256'
import { login } from '@/api/user'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ message: '请输入帐号', required: true, trigger: ['change', 'blur'], whitespace: true }],
        password: [{ message: '请输入密码', required: true, trigger: ['change', 'blur'], whitespace: true }]
      },
      loading: false
    }
  },
  methods: {
    handleHome () {
      localStorage.setItem('token', '1234')
      this.$router.push({ path: '/' })
    },
    handleSubmit () {
      console.log(this.form)
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return false
        }
        this.loading = true
        login({
          ...this.form
          // password: SHA256(this.form.password).toString()
        })
          .then(data => {
            console.log('data', data)
            localStorage.setItem('access-token', data[0])
            localStorage.setItem('refresh-token', data[1])
            this.$notification.success({
              message: '登录成功',
              description: '欢迎回来'
            })
            this.$router.push({ path: '/' })
          })
          .catch(err => {
            console.log('err', { ...err })
            /* this.$message.error(err?.data?.errorMessage || '登录失败') */
          })
          .finally(() => {
            this.loading = false
          })
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
