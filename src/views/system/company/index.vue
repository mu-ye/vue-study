<template>
  <div>
    <a-divider> form-model 使用示例</a-divider>
    <a-divider orientation="left"> 知识点</a-divider>
    <p>
      1.
    </p>
    <a-divider orientation="left"> demo </a-divider>
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
  </div>
</template>
<script>
  import request from '@/utils/request'

  export default {
    data () {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
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
      onSubmit () {
        this.$refs.ruleForm.validate(valid => {
          console.log(this.formData.date.format('YYYY-MM-DD HH:mm:ss'))
          if (valid) {
            request.get('/form', { params: {
                ...this.formData,
                date: this.formData.date.format('YYYY-MM-DD HH:mm:ss')
              }

            }).then(data => {
              console.log(data)
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
