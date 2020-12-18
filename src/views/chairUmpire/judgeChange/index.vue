<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :span="22" offset="1">
        <a-table :columns="columns" :data-source="judgeData" bordered :pagination="false" rowKey="code">
          <span slot="studentMissAction" slot-scope="text, record">
            <a-button type="primary" @click="showDrawer(record.typeName, record.id)">
              变更裁判
            </a-button>
          </span></a-table
        >
      </a-col>
      <a-drawer
        title="裁判变更"
        :width="500"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form :form="form" layout="vertical" hide-required-mark @submit="handleSubmit">
          <a-row style="display: none">
            <a-col :span="24">
              <a-form-item label="id">
                <a-input
                  v-decorator="[
                    'seatId',
                    { initialValue: id },
                    {
                      rules: [{ required: true, message: 'id不能为空' }]
                    }
                  ]"
                  placeholder="请输入分组名称"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="22" offset="1">
              <p>
                选择考位 <b> {{ id }} </b>要替换的裁判
              </p>
            </a-col>
          </a-row>
          <a-row style="margin-top: 20px">
            <a-col :span="22" offset="1">
              <a-form-item>
                <a-select
                  allowClear="true"
                  show-search
                  option-filter-prop="children"
                  v-decorator="[
                    'judgeId',
                    {
                      rules: [{ required: true, message: '备用裁判不能为空' }]
                    }
                  ]"
                >
                  <a-select-option :value="item.id" v-for="(item, key) in backUpJudgeData" :key="key">
                    {{ item.code }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1
          }"
        >
          <a-button type="primary" @click="handleSubmit" style="width: 100%">
            提交
          </a-button>
        </div>
      </a-drawer>
    </a-row>
  </div>
</template>

<script>
const columns = [
  {
    title: '座位id',
    className: 'id',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '裁判编号',
    className: 'code',
    dataIndex: 'code',
    align: 'center'
  },
  {
    title: '监考类型',
    className: 'typeName',
    dataIndex: 'typeName',
    align: 'center'
  },
  {
    title: '操作',
    className: 'state',
    align: 'center',
    scopedSlots: { customRender: 'studentMissAction' }
  }
]
export default {
  name: 'Index',
  data () {
    return {
      visible: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      id: 1,
      code: '',
      columns,
      judgeData: [],
      backUpJudgeData: []
    }
  },
  mounted () {
    this.getJudgeDate()
  },
  methods: {
    getJudgeDate () {
      this.axios.get('/judgeDrawResult/getJudgeDrawResultShowVOList').then(data => {
        this.judgeData = data
      })
    },
    getBackUpJudgeDate (judgeType) {
      this.axios.get('/judge/getBackUpJudgeListByType?judgeType=' + judgeType).then(data => {
        this.backUpJudgeData = data
      })
    },
    showDrawer (judgeType, id) {
      // 查找备用裁判
      this.id = id
      this.getBackUpJudgeDate(judgeType)
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.axios
            .get('/judgeDrawResult/doChangeJudge?seatId=' + values.seatId + '&judgeId=' + values.judgeId)
            .then(data => {
              // 关闭抽屉
              this.onClose()
              // 重新刷新数据
              this.getJudgeDate()
              this.$message.success('变更成功！')
              this.form.setFieldsValue({
                judgeId: ``
              })
            })
        }
      })
    }
  }
}
</script>

<style scoped></style>
