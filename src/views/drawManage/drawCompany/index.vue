<template>
  <div>
    <a-row>
      <a-col :span="2" offset="1">
        <div style="text-align: center; margin-top: 50px">
          <a-button :disabled="!drawFlag" type="primary" @click="startDraw">开始抽签</a-button>
        </div>
      </a-col>
      <a-col :span="19" offset="1" style="text-align: center">
        <a-table
          :columns="columns"
          :data-source="afterDrawCompany"
          bordered
          :pagination="false"
          rowKey="orderOne"
          size="small"
        ></a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const columns = [
  {
    title: '顺序',
    className: 'orderOne',
    dataIndex: 'orderOne',
    key: 'orderOne'
  },
  {
    title: '代表队',
    className: 'companyOneName',
    dataIndex: 'companyOneName',
    key: 'companyOneName'
  },
  {
    title: '顺序',
    className: 'orderTwo',
    dataIndex: 'orderTwo',
    key: 'orderTwo'
  },
  {
    title: '代表队',
    className: 'companyTwoName',
    dataIndex: 'companyTwoName',
    key: 'companyTwoName'
  },
  {
    title: '顺序',
    className: 'orderThree',
    dataIndex: 'orderThree',
    key: 'orderThree'
  },
  {
    title: '代表队',
    className: 'companyThreeName',
    dataIndex: 'companyThreeName',
    key: 'companyThreeName'
  },
  {
    title: '顺序',
    className: 'orderFour',
    dataIndex: 'orderFour',
    key: 'orderFour'
  },
  {
    title: '代表队',
    className: 'companyFourName',
    dataIndex: 'companyFourName',
    key: 'companyFourName'
  }
]
export default {
  data () {
    return {
      columns,
      afterDrawCompany: [],
      forDrawCompany: [],
      drawResult: [],
      drawFlag: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.axios.get('/drawState/getStateById?id=1').then(data => {
        if (data === 1) {
          this.drawFlag = true
          // 显示抽签前的结果
        }
        this.axios.get('/company/getAfterCompanyList').then(data => {
          this.afterDrawCompany = data
        })
      })
    },
    startDraw () {
      this.axios.get('/company/drawCompany').then(data => {
        this.drawFlag = false
        this.init()
      })
    }
  }
}
</script>

<style scoped></style>
