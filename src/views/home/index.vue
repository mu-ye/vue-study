<template>
  <div>

    <div>
      <a-divider>
        <p>alert 页面警告提示时使用</p>
      </a-divider>
      <a-alert
        :message="alertMessage"
        :description="alertDescription"
        :type="alertType"
        close-text="Close Now"
        show-icon
        :after-close="handleClose"
      />
    </div>

    <div>
      <a-divider
        orientation="left">
        <p> message 使用方法 </p>
      </a-divider>
      <p>
        方法一：
        1. import message from 'ant-design-vue/es/message'
        2. message.success('内容')</p>
      <p> 方法二：
        this.$message.success('内容')
      </p>
    </div>

    <div>
      <a-divider><p>Notification 使用</p></a-divider>
      <a-button type="primary" @click="NotificationClick1">
        Notification 左上
      </a-button>
      <a-divider type="vertical"/>
      <a-button type="primary" @click="NotificationClick2">
        Notification 左下
      </a-button>
      <a-divider type="vertical"/>
      <a-button type="primary" @click="NotificationClick3">
        Notification 右上
      </a-button>
      <a-divider type="vertical"/>
      <a-button type="primary" @click="NotificationClick4">
        Notification 右下
      </a-button>
    </div>

    <div>
      <a-divider>pop confirm 使用示例</a-divider>
      <a-popconfirm
        title="确认删除?"
        cancelText="取消"
        okText="确认"
        @confirm="() => onTableDelete()"
      >
        <a href="javascript:;">删除</a>
      </a-popconfirm>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        alertMessage: ' 标题 ',
        alertDescription: '0. message: 标题   1. description 详情  2. close-text: 默认设置 closable 为 true; 3. type：success、info、warning、error 4. show-icon：显示图标 5. :after-close 关闭后的回调',
        alertType: 'info', // success、info、warning、error
        closable: false,
        visible: true
      }
    },
    methods: {
      handleClose () {
        console.log('<a-alert> 关闭函数已回调')
        this.$message.success('<a-alert> 关闭函数已回调')
      },
      NotificationClick1 () {
        this.$notification.success({
          key: 1,
          // 弹出位置  topLeft topRight bottomLeft bottomRight
          placement: 'topLeft',
          message: 'Notification Title',
          description: 'description.'
        })
      },
      NotificationClick2 () {
        this.$notification.info({
          key: 2,
          // 弹出位置  topLeft topRight bottomLeft bottomRight
          placement: 'bottomLeft',
          message: 'Notification Title',
          description: 'description.'
        })
      },
      NotificationClick3 () {
        this.$notification.warning({
          key: 3,
          // 弹出位置  topLeft topRight bottomLeft bottomRight
          placement: 'topRight',
          message: 'Notification Title',
          description: 'description.'
        })
      },
      NotificationClick4 () {
        this.$notification.error({
          key: 4,
          // 弹出位置  topLeft topRight bottomLeft bottomRight
          placement: 'bottomRight',
          message: 'Notification Title',
          description: 'description.'
        })
      },
      onTableDelete () {
        console.log('删除成功')
        // this.$message.success('<a-alert> 关闭函数已回调')
      }
    }
  }
</script>
