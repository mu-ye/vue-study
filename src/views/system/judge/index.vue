<template>
  <div>
    <a-card>
      <div class="table-operations">
        <a-upload
          name="file"
          :multiple="false"
          action="/njdt/judge/uploadJudge"
          :headers="headers"
          @change="handleChange"
        >
          <a-button>
            <a-icon type="upload"/>
            导入裁判数据
          </a-button>
        </a-upload>
      </div>
      <a-table :columns="columns" :data-source="data" rowKey="id" :pagination="false" style="margin-top: 10px">
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
      title: '裁判编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    // {
    //   title: '性别',
    //   dataIndex: 'sex',
    //   key: 'sex'
    // },
    {
      title: '所属单位',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '身份证',
      dataIndex: 'idCard',
      key: 'idCard'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone'
    }
  ]
  export default {
    data () {
      return {
        columns,
        data: [],
        headers: {
          authorization: 'authorization-text'
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.axios.get('/judge/getJudgeList').then(data => {
          console.log(data)
          this.data = data
        })
      },
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
      }
    }
  }
</script>
