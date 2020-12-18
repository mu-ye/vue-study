<template>
  <global-footer class="footer">
    <template v-slot:links>
      <img
        src="~@/assets/logo.svg"
        class="logo"
        alt="南京地铁运营有限责任公司"
        height="14"
        style="margin-right: 24px"
      />
      <img src="~@/assets/maker.png" class="logo" alt="电子及信息技术研究院" height="14" />
    </template>
    <template v-slot:copyright>
      Copyright &copy; 2020 电子及信息技术研究院
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>

<style lang="less" scoped>
.footer {
  margin: 0;
}
</style>
