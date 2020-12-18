<template>
  <a-result status="404" title="404" sub-title="非常抱歉，您访问的页面不存在">
    <template #extra>
      <a-button type="primary" @click="backHome">
        返回首页
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    backHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
