<template>
  <div>
    <a-button type="primary" @click="doDraw"> 试题抽签</a-button>

    <a-table
      :columns="columns"
      :data-source="drawResult"
      bordered
      :pagination="false"
      rowKey="id"
      size="small"
    ></a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: '场次',
    dataIndex: 'gameNumber',
    key: 'gameNumber'
  },
  {
    title: '考试类型',
    dataIndex: 'gameType',
    key: 'gameType'
  },
  {
    title: '试题名称',
    dataIndex: 'name',
    key: 'name'
  }
]
export default {
  name: 'Index',
  data () {
    return {
      drawResult: [],
      columns
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.axios.get('/questionDraw/getList').then(data => {
        this.drawResult = data
        console.log('1')
      })
    },

    doDraw () {
      this.axios.get('/questionDraw/doDraw').then(data => {
        this.$message.success('试题抽签成功')
        this.init()
      })
    }
  }
}
</script>

<style scoped></style>
