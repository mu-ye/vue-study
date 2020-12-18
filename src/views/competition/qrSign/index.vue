<template>
  <div style="font-size: 24px">
    <!--    <a-button @click="test()">test</a-button>-->
    <a-alert
      message="提示信息！"
      :description="msg"
      type="info"
      show-icon
    />
    <a-modal
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk(signInfo.id)"
      @cancel="handleCancel(signInfo.codeId)"
      okText="确认"
      cancelText="取消"
      :maskClosable="false"
      :keyboard="false"
      width="800px"
    >
      <div style="font-size: 24px">
        <a-descriptions :title="title" layout="vertical" bordered>
          <a-descriptions-item label="照片" span="3">
            <div style="width: 100%;text-align: center">
              <img
                style="height:150px;"
                :src="signInfo.url"
              />
            </div>
          </a-descriptions-item>
          <a-descriptions-item label="姓名">
            <p style="font-size: 24px">{{ signInfo.name }}</p>
            <!--        </a-descriptions-item>-->
            <!--        <a-descriptions-item label="年龄">-->
            <!--          {{ signInfo.age }}-->
          </a-descriptions-item>
          <a-descriptions-item label="身份证">
            <p style="font-size: 24px">{{ signInfo.idCard }}</p>
          </a-descriptions-item>
          <!--        <a-descriptions-item label="公司名称">-->
          <!--          {{ signInfo.companyName }}-->
          <!--        </a-descriptions-item>-->
          <!--        <a-descriptions-item label="手机">-->
          <!--          {{ signInfo.phone }}-->
          <!--        </a-descriptions-item>-->
          <a-descriptions-item v-if="signInfo.type == 2" label="考位">
            <p style="font-size: 24px"><b> {{ signInfo.seatInfo }}</b></p>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-modal>
    <div v-if="signInfo.type == 1">
      <a-card :title="titleInfo">
        <a-table
          :columns="columnsOne"
          :data-source="signOneData"
          :pagination="false"
          rowKey="code"
          style="margin-top: 10px"
          size="small"
        ></a-table>
      </a-card>
    </div>
    <div v-if="signInfo.type == 2">
      <a-card :title="titleInfo">
        <a-table
          :columns="columns"
          :data-source="signTwoData"
          :pagination="false"
          rowKey="code"
          style="margin-top: 10px"
          size="small"
        ></a-table>
      </a-card>
    </div>
    <div v-if="signInfo.type == 4">
      <a-card :title="titleInfo">
        <a-table
          :columns="columnsOne"
          :data-source="signAway"
          :pagination="false"
          rowKey="code"
          style="margin-top: 10px"
          size="small"
        ></a-table>
      </a-card>
    </div>
  </div>
</template>

<script>
  const columns = [
    {
      title: '所属单位',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard'
    },
    {
      title: '考位',
      dataIndex: 'seatInfo',
      key: 'seatInfo'
    }
  ]
  const columnsOne = [
    {
      title: '所属单位',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard'
    }
  ]
  export default {
    name: 'QrSign',
    data () {
      return {
        columns,
        columnsOne,
        timer: null,
        title: null,
        signInfo: {
          code: '',
          name: '',
          age: 0,
          idCard: '',
          companyName: '',
          phone: '',
          url: '',
          seatInfo: '',
          codeId: 0
        },
        confirmLoading: false,
        visible: false,
        idList: [],
        signTwoData: [],
        signOneData: [],
        signAway: [],
        msg: '',
        titleInfo: ''
      }
    },
    mounted () {
      this.timer = setInterval(this.test, 1000)
    },
    destroyed () {
      clearInterval(this.timer)
    },
    methods: {
      test () {
        this.axios.get('/code-state/getInfoAndSign').then(
          data => {
            if (data != null && data.name != null) {
              this.signInfo = data
              console.log(data)
              this.showModal()
              clearInterval(this.timer)
              // this.$message.info('有数据')
              if (this.signInfo.type === 1) {
                this.title = '进入候考区签到'
                this.msg = '进入候考区的考生,请在此扫码！'
              }
              if (this.signInfo.type === 2) {
                this.title = '进入备考区签到'
                this.msg = '进入备考区的考生,请在此扫码！'
              }
              if (this.signInfo.type === 4) {
                this.title = '离开考试区签出'
                this.msg = '离开考试区的考生,请在此扫码！'
              }
            } else {
              this.signInfo = data
              // this.$message.error('没有此考生信息！')
              if (this.signInfo.type === 1) {
                this.msg = '进入候考区的考生,请在此扫码！'
              }
              if (this.signInfo.type === 2) {
                this.msg = '进入备考区的考生,请在此扫码！'
              }
              if (this.signInfo.type === 4) {
                this.msg = '离开考试区的考生,请在此扫码！'
              }
            }
          }
        )
        if (this.signInfo.type === 1) {
          this.axios.get('/student/getStudentListHaveSignOne').then(data => {
            this.signOneData = []
            this.signOneData = data
            this.titleInfo = '候考区人数：' + data.length + '人'
          })
        }
        if (this.signInfo.type === 2) {
          this.axios.get('/student/getStudentListHaveSignTwo').then(data => {
            this.signTwoData = []
            this.signTwoData = data
            this.titleInfo = '备考区人数：' + data.length + '人'
          })
        }
        if (this.signInfo.type === 4) {
          this.axios.get('/student/getStudentListHaveSignAway').then(data => {
            this.signAway = []
            this.signAway = data
            this.titleInfo = '离场人数：' + data.length + '人'
          })
        }
      },
      showModal () {
        this.visible = true
      },
      handleOk (e) {
        console.log(e)
        this.confirmLoading = true
        setTimeout(() => {
          this.sign()
          this.visible = false
          this.confirmLoading = false
        }, 1000)
      },
      handleCancel (codeId) {
        console.log(codeId)
        this.axios.delete('/code-state/deleteCodeById?id=' + codeId).then(data => {
          console.log('删除结果：', data)
        })
        this.timer = setInterval(this.test, 1000)
        this.visible = false
      },
      sign () {
        this.idList = []
        this.idList.push(this.signInfo.id)
        if (this.signInfo.type === 1) {
          this.axios.post('/student/signInOne', this.idList).then(() => {
            this.$message.info('签到成功')
          })
        }
        if (this.signInfo.type === 2) {
          this.axios.post('/student/signInTwo', this.idList).then(() => {
            this.$message.info('签到成功')
          })
        }
        if (this.signInfo.type === 4) {
          this.axios.post('/student/signAway', this.idList).then(() => {
            this.$message.info('签离成功')
          })
        }
        this.timer = setInterval(this.test, 1000)
      }
    }

  }
</script>
<style>
  .ant-descriptions-item-label {
    color: rgba(0, 0, 0, 0.85);
    font-weight: normal;
    font-size: 24px;
    line-height: 1.5;
  }
</style>
