<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-row>
        <a-col span="12">
          <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="studentSign">
            签到
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `选择 ${selectedRowKeys.length} 人` }}
            </template>
          </span>
        </a-col>
        <a-col span="12" style="text-align: right">
          <div>
            <a-input-search placeholder="输入单位查询" style="width: 200px" @search="onSearch"/>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="dataTemp"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :pagination="false"
    >
      <span slot="img" slot-scope="text, record">
        <img
          style="height:50px;"
          :src="`http://172.18.10.201:8889/res/file/idCard/${record.idCard}.png`"
        />
      </span>
      <span slot="action" slot-scope="text, record">
        <div v-if="record.signState == '0'" class="error">未签到</div>
        <div v-else class="success">已签到</div>
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
      title: '照片',
      key: 'img',
      scopedSlots: { customRender: 'img' }
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
        dataTemp: [],
        columns,
        loading: false,
        selectedRowKeys: [],
        searchTempList: []
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
        this.axios.get('/student/getStudentList').then(data => {
          this.data = data
          this.dataTemp = data
        })
      },
      studentSign () {
        this.loading = true
        // ajax request after empty completing
        setTimeout(() => {
          this.loading = false
          console.log(this.selections)

          this.axios.post('/student/signIn', this.selectedRowKeys).then(() => {
            this.selectedRowKeys = []
            this.init()
          })
        }, 1000)
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      action (text, record) {
        return record.name + '***' + record.name
      },
      onSearch (value) {
        this.searchTempList = []
        if (value === '') {
          this.dataTemp = this.data
        } else {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].companyName.indexOf(value) > -1) { // 此处判断包含，如同like
            this.searchTempList.push(this.data[i])
          }
        }
        this.dataTemp = this.searchTempList
        }
      }

      // studentSign () {
      //   console.log(this.selectedRowKeys)
      //  // this.axios.post('', this.rowSelection).then(() => {})
      // }
    }
  }
</script>
<style>
  .success {
    color: #52c41a;
  }

  .error {
    color: #ff4d4f;
  }

  .link {
    color: #1890ff;
  }

  .warning {
    color: #faad14;
  }
</style>
