<template>
  <div>
    <div>
      <a-button type="primary" :disabled="!typeButtonDisabled" @click="drawJudgeType"> 裁判类型抽签 </a-button>
      <a-button type="primary" :disabled="!exeButtonDisabled" @click="drawJudgeExe" style="margin-left: 30px">
        执行裁判抽签
      </a-button>
    </div>
    <div v-if="resultDisables">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-table :columns="columns" :data-source="opticalData" bordered :pagination="false" rowKey="code">
            <template slot="title">
              <p style="text-align: center"><b>光缆接续</b></p>
            </template>
          </a-table>
        </a-col>
        <a-col :span="8">
          <a-table :columns="columns" :data-source="switchData" bordered :pagination="false" rowKey="code">
            <template slot="title">
              <p style="text-align: center"><b>视频搭建</b></p>
            </template>
          </a-table>
        </a-col>
        <a-col :span="8">
          <a-table :columns="columns" :data-source="videoData" bordered :pagination="false" rowKey="code">
            <template slot="title">
              <p style="text-align: center"><b>交换机组网</b></p>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '裁判编号',
    className: 'code',
    dataIndex: 'code'
  },
  {
    title: '裁判姓名',
    className: 'name',
    dataIndex: 'name'
  },
  {
    title: '是否监场',
    className: 'masterName',
    dataIndex: 'masterName'
  }
]

export default {
  data () {
    return {
      typeButtonDisabled: false,
      exeButtonDisabled: false,
      resultDisables: false,
      columns,
      opticalData: [],
      switchData: [],
      videoData: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 先获取是否可以裁判抽签状态
      this.axios.get('/drawState/getJudgeState').then(data => {
        console.log(data)
        this.typeButtonDisabled = data[0]
        this.exeButtonDisabled = data[1]
        this.resultDisables = data[2]
        // 如果可以显示结果 查询结果
        this.axios.get('/judge/getJudgeDrawVO').then(data => {
          console.log(data)
          this.opticalData = data[0]
          this.switchData = data[1]
          this.videoData = data[2]
        })
      })
    },
    drawJudgeType () {
      this.axios.get('/judge/judgeGrouping').then(data => {
        console.log('data:' + data)
        if (data === null) {
          this.$message.success('裁判抽签成功')
          this.init()
        } else {
          this.$message.error('裁判抽签失败')
        }
      })
    },
    drawJudgeExe () {
      this.axios.get('/judge/choiceMasterJudgeFormAllJudge').then(data => {
        console.log('data:' + data)
        if (data === null) {
          this.$message.success('执行裁判抽签成功')
          this.init()
        } else {
          this.$message.error('执行裁判抽签失败')
        }
      })
    }
  }
}
</script>
