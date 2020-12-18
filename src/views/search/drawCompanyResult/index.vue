<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-card size="small" title="抽签结果" style="width: 300px">
          <p v-for="(item, key) in drawResult" :key="key">{{ item.drawResult }}{{ item.name }} </p>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-upload
          name="file"
          :multiple="false"
          action="/api/test-result/readExcel"
          :headers="headers"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 上传机考得分 </a-button>
        </a-upload>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
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
          this.$message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`)
        }
      },
      init () {
        this.axios.get('/company/getDrawResult').then(data => {
          console.log(data)
          this.drawResult = data
        })
      }
    }
  }
</script>
