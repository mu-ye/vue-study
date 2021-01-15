<template>
  <div>
    <div>
      <a-button type="primary" @click="addRecord"> 添加一条记录 </a-button>
      <a-divider type="vertical"></a-divider>
      <a-button type="primary" @click="addRecord"> 批量导入 </a-button>
    </div>
    <div style="margin-top: 25px">
      <a-table
        bordered
        :data-source="tableData"
        :columns="columns"
        rowKey="username"
        :pagination="false"
      >
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="确认删除?"
            cancelText="取消"
            okText="确认"
            @confirm="() => deleteTableRecordById(record.id)"
          >
            <a href="javascript:;" class="deleteColor">删除</a>
          </a-popconfirm>
          <a-divider type="vertical"/>
          <a href="javascript:;">编辑</a>
        </template>
      </a-table>
      <!-- 添加用户 -->
      <a-drawer
        title=" 添加一条记录"
        width="520"
        :visible="visible"
        :body-style="{paddingBottom: '80px'}"
        @close="onDrawerClose"
      >
        <a-form-model
          :model="formData"
          :rules="rules"
          ref="ruleForm"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-form-model-item label="用户名" prop="username" >
            <a-input v-model="formData.username"></a-input>
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input v-model="formData.password"></a-input>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">
              提交
            </a-button>
            <a-button style="margin-left: 10px;" @click="resetForm">
              取消
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-drawer>
    </div>
  </div>
</template>
<script>
  import request from '@/utils/request'
  export default {
    data () {
      return {
        // 表格数据
        columns: [
          {
            align: 'center',
            title: '姓名',
            dataIndex: 'username',
            width: '25%'
          },
          {
            align: 'center',
            title: '密码',
            width: '25%',
            dataIndex: 'password'
          },
          {
            align: 'center',
            title: '操作',
            width: '50%',
            dataIndex: 'id',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        tableData: undefined,
        // 添加记录
        formData: {
          username: undefined,
          password: undefined
        },
        rules: {
          username: [{ message: '请输入用户名', required: true, trigger: ['change', 'blur'], whitespace: true }],
          password: [{ message: '请输入密码', required: true, trigger: ['change', 'blur'], whitespace: true }]
        },

        visible: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }

      }
    },
    mounted () {
      // 页面加载时执行的函数
      this.getTableData()
    },
    methods: {
      getTableData () {
        request.get('/user/getList')
        .then(data => {
            this.tableData = data
        })
      },
      deleteTableRecordById (id) {
        request.post('/user/deleteById', {
          param: {
            id: id
          }
        })
        .then(data => {
          // 刷新表格
          this.getTableData()
        })
      },
      onSubmit () {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            request.post('/user/add', {
                ...this.formData
              }).then(data => {
              this.visible = false
              this.getTableData()
            })
          } else {
            // 验证失败执行的操作
            console.log('error submit!!')
            return false
          }
        })
      },

      onDrawerClose () {
        this.visible = false
        // 刷新数据操作
      },
      addRecord () {
        this.visible = true
      },

      resetForm () {
        this.$refs.ruleForm.resetFields()
      }

    }
  }
</script>
<style>
  .deleteColor{
    color: red;
  }
</style>
