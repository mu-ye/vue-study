<template>
  <div>
    <a-divider> form-model 使用示例</a-divider>
    <a-divider orientation="left"> 知识点</a-divider>
    <p>
      1.
    </p>
    <a-divider orientation="left"> demo </a-divider>

    <div>
      <a-button type="primary" @click="addRecord"> 添加一条记录 </a-button>
      <a-table
        bordered
        :data-source="tableData"
        :columns="columns"
        rowKey="numberLine"
        :pagination="false"
      >
        <template slot="operation" slot-scope="text, record">
          <!--操作模板中的事件-->
          <a-popconfirm
            v-if="dataSource.length"
            title="确认删除？分组内系统也会一同删除"
            cancelText="取消"
            okText="确定"
            @confirm="() => onDelete(record.id)"
          >
            <a href="javascript:;" style="color: red" @click="delelteGroup(record.id)">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
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
          <a-form-model-item label="性别" prop="sex">
            <a-select v-model="formData.sex" >
              <a-select-option value="1">
                男
              </a-select-option>
              <a-select-option value="2">
                女
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="选择日期" required prop="date">
            <a-date-picker
              v-model="formData.date"
              type="date"
              show-time
              placeholder="Pick a date"
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%;"
            />
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
        columns: [
          {
            align: 'center',
            title: '分组名称',
            // 表格在数据列中对应的值
            dataIndex: 'name',
            width: '50%',
            scopedSlots: { customRender: 'name' }
          },
          {
            align: 'center',
            title: '每行显示数目',
            width: '25%',
            dataIndex: 'numberLine'
          },
          {
            align: 'center',
            title: '操作',
            dataIndex: 'id',
            width: '25%',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        tableData: undefined,

        visible: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
        formData: {
          username: '',
          sex: undefined,
          date: undefined
        },
        rules: {
          username: [{ message: '请输入用户名', required: true, trigger: ['change', 'blur'], whitespace: true }],
          sex: [{ message: '选择姓名', required: true, trigger: ['change', 'blur'], whitespace: true }],
          date: [{ message: '选择日期', required: true, trigger: ['change', 'blur'] }]
        }
      }
    },
    methods: {
      onDrawerClose () {
        this.visible = false
        // 刷新数据操作
      },
      addRecord () {
        this.visible = true
      },
      onSubmit () {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            request.get('/form', { params: {
                ...this.formData,
                date: this.formData.date.format('YYYY-MM-DD HH:mm:ss')
              }

            }).then(data => {
              console.log(data)
              // 关闭页面
              this.visible = false
            }).catch(e => {
              console.log(e)
            })
          } else {
            // 验证失败执行的操作
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm () {
        this.$refs.ruleForm.resetFields()
      }

    }
  }
</script>
