<template>
  <div>
    <a-row>
      <a-col span="24">
        <a-alert
          message="提示信息！"
          description="考生进入候考区时签到页面，面向已报道的参赛选手（非领队，工作人员）！"
          type="info"
          show-icon
        />
      </a-col>
    </a-row>

    <div style="margin-top: 10px">
      <a-row>
        <a-col span="24">
          <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="studentSign">
            签到
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `已选择 ${selectedRowKeys.length} 人` }}
            </template>
          </span>
          <a-card>
            <a-table
              rowKey="id"
              :columns="columns"
              :data-source="data"
              :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              :pagination="false"
              style="margin-top: 10px">
              <span slot="action" slot-scope="text,record">
                <div v-if="record.testDayState === 0">未签到</div>
                <div v-else-if="record.testDayState === 2">      <a-tag color="#87d068">
                  已进入备考区
                </a-tag></div>
                <div v-else-if="record.testDayState === 1">      <a-tag color="#2db7f5">
                  已进入候考区
                </a-tag></div>
                <div v-else-if="record.testDayState === 3">      <a-tag color="#108ee9">
                  已进入考试区
                </a-tag></div>
                <div v-else-if="record.testDayState === 4">      <a-tag color="red">
                  已离场
                </a-tag></div>
              </span>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
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
      title: '性别',
      dataIndex: 'sex',
      key: 'sex'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '所属单位',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '候考签到',
      key: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]

  const data = []

  export default {
    data () {
      return {
        data,
        columns,
        loading: false,
        selectedRowKeys: []
      }
    },
    mounted () {
      this.init()
    },
    computed: {
      hasSelected () {
        return this.selectedRowKeys.length > 0
      }
    },
    methods: {
      init () {
        this.axios.get('/student/getStudentListHaveRegister').then(data => {
          console.log(data)
          this.data = data
        })
      },
      studentSign () {
        this.loading = true
        // ajax request after empty completing
        setTimeout(() => {
          this.loading = false
          console.log(this.selections)

          this.axios.post('/student/signInOne', this.selectedRowKeys).then(() => {
            this.selectedRowKeys = []
            this.init()
          })
        }, 1000)
      },
      onSelectChange (selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.selectedRowKeys = selectedRowKeys
      },
      action (text, record) {
        return record.name + '***' + record.name
      }
    }
  }
</script>
