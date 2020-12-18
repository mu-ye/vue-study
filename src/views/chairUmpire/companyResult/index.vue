<template>
  <div>
    <a-button @click="exportExcel()">导出excel</a-button>
    <a-card style="margin-top: 10px">
      <a-table
        :columns="columns"
        :data-source="companyResult"
        bordered
        :pagination="false"
        rowKey="id"
        @change="onChange"
        size="small"
      >
      </a-table>
    </a-card>
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
      title: '公司',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '综合成绩',
      dataIndex: 'comprehensiveResult',
      key: 'comprehensiveResult',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.comprehensiveResult - b.comprehensiveResult
    }
  ]

  function onChange (pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter)
  }

  export default {
    data () {
      return {
        columns,
        companyResult: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.axios.get('/test-final-result/getCompanyResult').then(data => {
          console.log(data)
          this.companyResult = data
        })
      },
      onChange,
      exportExcel () {
        window.open('/njdt/test-result/exportExcel')
      }
    }
  }
</script>
