<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-upload
          name="file"
          :multiple="false"
          action="/njdt/test-result/readExcel"
          :headers="headers"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 上传机考得分 </a-button>
        </a-upload>
      </a-col>
    </a-row>
    <a-row style="margin-top: 10px">
      <a-col span="24">
        <a-table :columns="columns" :data-source="data" rowKey="code" :pagination="false">
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  const columns = [
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex'
    },
    {
      title: '身份证',
      dataIndex: 'idCard',
      key: 'idCard'
    },
    {
      title: '单位',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '机考成绩',
      dataIndex: 'computerTestResult',
      key: 'computerTestResult'
    }
  ]
  const data = []
  export default {
    data () {
      return {
        columns,
        data,
        drawResult: [],
        headers: {
          authorization: 'authorization-text'
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      handleChange (info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          this.$message.success(`${info.file.name} 上传成功！`)
          this.init()
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} 上传失败`)
        }
      },
      init () {
        this.axios.get('/student/getStudentList').then(data => {
          this.data = data
        })
      }
    }
  }
</script>
