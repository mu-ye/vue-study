<template>
  <div>
    <a-col span="24" style="text-align: center">
      <div>
        <a-input-search placeholder="输入考生姓名查询" style="width: 200px" @search="onSearch"/>
      </div>
      <a-card style="margin-top: 10px">
        <a-table
          rowKey="id"
          :columns="columns"
          :data-source="forAdjustList"
          :pagination="false">
          <span slot="info" slot-scope="text,record">
            <div v-if="record.flag === false">无效</div>
            <div v-else-if="record.flag=== true">有效</div>
          </span>
          <span slot="action" slot-scope="text,record">
            <div v-if="record.flag === false"><a-button type="primary" @click="changeFlag(record.id)">改为有效</a-button></div>
          </span>
        </a-table>
      </a-card>
    </a-col>
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
      title: '场次',
      dataIndex: 'gameNumber',
      key: 'gameNumber'
    },
    {
      title: '轮次',
      dataIndex: 'gameRound',
      key: 'gameRound'
    },
    {
      title: '考生id',
      dataIndex: 'studentId',
      key: 'studentId'
    },
    {
      title: '考生姓名',
      dataIndex: 'studentName',
      key: 'studentName'
    },
    {
      title: '单位',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '暂停用时',
      dataIndex: 'pauseTime',
      key: 'pauseTime'
    },
    {
      title: '是否有效',
      key: 'info',
      scopedSlots: { customRender: 'info' }
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
  export default {
    name: '',
    data () {
      return {
        columns,
        name,
        forAdjustList: []
      }
    },
    methods: {
      onSearch (value) {
        this.name = value
        console.log(value)
        this.axios.get('/test-result/getPauseAdjustList?name=' + value).then(data => {
          this.forAdjustList = data
        })
      },
      changeFlag (id) {
        const that = this
        this.$confirm({
          title: '确认修改?',
          onOk () {
            that.axios.get('/test-result/changeFlag?id=' + id).then(() => {
              that.$message.info('修改成功')
              that.onSearch(that.name)
            })
          },
          onCancel () {}
        })
      }
    }
  }
</script>
