<template>
  <div>
    <a-divider> 轮询示例 </a-divider>

    <p> 数值每秒加一 {{ messageText }}</p>
    <a-button type="primary" @click="onClick"> 暂停 </a-button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
          messageText: 1
      }
    },
    mounted () {
      this.stateTimer = setInterval(this.printMessage, 1000)
    },
    methods: {
      printMessage () {
        this.messageText += 1
        console.log('messageText:', this.messageText)
      },
      onClick () {
        clearInterval(this.stateTimer)
      }
    },
    destroyed () {
      clearInterval(this.stateTimer)
    }

  }
</script>
