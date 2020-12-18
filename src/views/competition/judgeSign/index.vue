<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="studentSign">
        签到
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="data"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :pagination="false"
    >
      <span slot="action" slot-scope="text, record">
        <div v-if="record.signState == '0'">未签到</div>
        <div v-else>已签到</div>
      </span>
    </a-table>
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
    title: '签到状态',
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
      this.axios.get('/judge/getJudgeList').then(data => {
        this.data = data
      })
    },
    studentSign () {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        console.log(this.selections)

        this.axios.post('/judge/signIn', this.selectedRowKeys).then(() => {
          this.selectedRowKeys = []
          this.init()
        })
      }, 1000)
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
    // studentSign () {
    //   console.log(this.selectedRowKeys)
    //  // this.axios.post('', this.rowSelection).then(() => {})
    // }
  }
}
</script>
