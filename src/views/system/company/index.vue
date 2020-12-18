<template>
  <div>
    <!--    <div class="table-operations">-->
    <!--      <a-button type="primary" @click="showAddDrawer">-->
    <!--        新增单位-->
    <!--      </a-button>-->
    <!--    </div>-->
    <a-card>
      <div class="table-operations">
        <a-upload
          name="file"
          :multiple="false"
          action="/njdt/company/uploadCompany"
          :headers="headers"
          @change="handleChange"
        >
          <a-button>
            <a-icon type="upload" />
            导入参赛队数据
          </a-button>
        </a-upload>
      </div>
      <a-table :columns="columns" :data-source="data" rowKey="id" :pagination="false" style="margin-top: 5px">
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" @click="showDrawer(record)">
            编辑
          </a-button>
          <!--        <a-divider type="vertical" />-->
          <!--        <a-button type="danger" @click="showConfirm(record.id)">-->
          <!--          删除-->
          <!--        </a-button>-->
        </span>
      </a-table>
      <a-drawer
        title="编辑信息"
        :width="480"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form-model :form="form">
          <a-form-model-item label="单位编码">
            <a-input v-model="form.code" />
          </a-form-model-item>
          <a-form-model-item label="单位名">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="单位简介">
            <a-input v-model="form.introduction" />
          </a-form-model-item>
          <a-form-model-item label="领队姓名">
            <a-input v-model="form.leaderName" />
          </a-form-model-item>
          <a-form-model-item label="领队电话">
            <a-input v-model="form.leaderPhone" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" @click="handleSubmit">
              提交修改
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-drawer>
      <a-drawer
        title="新增单位"
        :width="480"
        :visible="addVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form-model :form="form">
          <a-form-model-item label="单位编码">
            <a-input v-model="form.code" />
          </a-form-model-item>
          <a-form-model-item label="单位名">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="单位简介">
            <a-input v-model="form.introduction" />
          </a-form-model-item>
          <a-form-model-item label="领队姓名">
            <a-input v-model="form.leaderName" />
          </a-form-model-item>
          <a-form-model-item label="领队电话">
            <a-input v-model="form.leaderPhone" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" @click="handleAddSubmit">
              新增单位
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-drawer>
    </a-card>
  </div>
</template>

<script>
const columns = [
  {
    title: '单位名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '单位编码',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '单位简介',
    dataIndex: 'introduction',
    key: 'introduction'
  },
  {
    title: '领队名',
    dataIndex: 'leaderName',
    key: 'leaderName'
  },
  {
    title: '领队电话',
    dataIndex: 'leaderPhone',
    key: 'leaderPhone'
  },
  {
    title: '操作',
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
      visible: false,
      addVisible: false,
      form: {
        id: 0,
        code: '',
        name: '',
        introduction: '',
        leaderName: '',
        leaderPhone: ''
      },
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
      this.axios.get('/company/getCompanyList').then(data => {
        console.log(data)
        this.data = data
      })
    },
    showDrawer (record) {
      console.log(record)
      this.visible = true
      this.form.id = record.id
      this.form.code = record.code
      this.form.name = record.name
      this.form.introduction = record.introduction
      this.form.leaderName = record.leaderName
      this.form.leaderPhone = record.leaderPhone
    },
    onClose () {
      this.visible = false
    },
    handleSubmit () {
      this.axios
        .post('/company/editCompany', this.form)
        .then(data => {
          this.$message.info('修改成功')
          this.visible = false
        })
        .catch(err => console.log(err.data))
    },
    showAddDrawer () {
      this.addVisible = true
      this.form = {
        id: undefined,
        code: '',
        name: '',
        introduction: '',
        leaderName: '',
        leaderPhone: ''
      }
    },
    handleAddSubmit () {
      this.axios.post('/company/addCompany', this.form).then(() => {
        this.$message.info('新增成功')
        this.addVisible = false
      })
    },
    deleteCompany (id) {
      this.axios.delete('/company/deleteCompany/' + id).then(data => {
        if (data.success) {
          this.$message.info('删除成功！')
        } else {
          this.$message.error(data.errorMessage)
        }
      })
      console.log(id)
    },
    showConfirm (id) {
      const that = this
      this.$confirm({
        title: '确认删除?',
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk () {
          that.deleteCompany(id)
        },
        onCancel () {}
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
