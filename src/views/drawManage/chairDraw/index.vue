<template>
  <div>
    <a-button type="primary" @click="drawSeat" :disabled="!drawFlag">赛位抽签</a-button> <a-button @click="exportSeatDrawResult()">导出赛位抽签结果</a-button>
    <a-table
      :columns="columns"
      :data-source="drawSeatResult"
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
    title: '顺序',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '代表队',
    dataIndex: 'companyName',
    key: 'companyName'
  },
  {
    title: '考生编号',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '赛位号id',
    dataIndex: 'seatId',
    key: 'seatId'
  },
  {
    title: '比赛场次',
    dataIndex: 'gameNumber',
    key: 'gameNumber'
  },
  {
    title: '比赛轮次',
    dataIndex: 'gameRound',
    key: 'gameRound'
  },
  {
    title: '组',
    dataIndex: 'groupId',
    key: 'groupId'
  }
]

export default {
  data () {
    return {
      columns,
      drawSeatResult: [],
      drawFlag: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    drawSeat () {
      this.axios.get('/student/drawSeat').then(data => {
        this.drawSeatResult = data
        this.init()
      })
    },
    init () {
      this.axios.get('/drawState/getStateById?id=2').then(data => {
        if (data === 1) {
          console.log(data)
          // 抽签按钮可用
          this.drawFlag = true
        } else {
          this.axios.get('/seatDraw/getSeatDrawList').then(data => {
            this.drawSeatResult = data
            this.drawFlag = false
          })
        }
      })
    },
    exportSeatDrawResult () {
      window.open('/njdt/seatDraw/exportSeatDrawResult')
    }
  }
}
</script>
