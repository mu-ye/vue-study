<template>
  <div>
    <a-card style="width: 100%;margin: 24px 0">
      <a-row>
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-row>
            <a-col :span="5" offset="1">
              <a-form-model-item label="场次" prop="gameNumber">
                <a-select placeholder="请选择场次" v-model="form.gameNumber">
                  <a-select-option v-for="item in gameNumberList" :value="item.value" :key="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="5" offset="1">
              <a-form-model-item label="轮次" prop="gameRound">
                <a-select v-model="form.gameRound">
                  <a-select-option v-for="index in gameRoundList" :key="index.value" :value="index.value">
                    {{ index.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="5" offset="1">
              <a-form-model-item label="裁判座位号" prop="seatId">
                <a-select placeholder="请选择裁判赛位" v-model="form.seatId">
                  <a-select-option v-for="item in seatIdList" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="5" offset="1">
              <a-form-model-item style="margin-top: 38px">
                <a-button type="primary" @click="onSubmit">
                  开始录入成绩
                </a-button>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-row>
    </a-card>
    <a-card v-if="standardShow">
      <a-row>
        <a-col :span="1" offset="1">
          <a-button @click="writeResultOk" type="primary">
            确认补录完成
          </a-button>
        </a-col>
      </a-row>
      <a-row style="margin-top: 30px">
        <a-col :span="22" offset="1">
          <a-table :columns="columns" :data-source="standardData" :pagination="false" rowKey="id" bordered>
            <template slot="cent" slot-scope="text, record">
              <editable-cell
                :id="record.id"
                :text="text"
                @change="onCellChange(record.key, 'cent', $event)"
              /> </template
            ></a-table>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 2
  },
  {
    title: '考核内容',
    dataIndex: 'text',
    key: 'text',
    width: 2
  },
  {
    title: '考核点',
    dataIndex: 'point',
    key: 'point',
    width: 2
  },
  {
    title: '评分标准',
    dataIndex: 'standard',
    key: 'standard',
    width: 10
  },
  {
    title: '最大得分',
    dataIndex: 'score',
    key: 'score',
    width: 5
  },
  {
    title: '最少得分',
    dataIndex: 'minScore',
    key: 'minScore',
    width: 5
  },
  {
    title: '得分',
    dataIndex: 'cent',
    scopedSlots: { customRender: 'cent' },
    width: 2
  }
]
const EditableCell = {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
          <a-input :value="value" @change="handleChange" @pressEnter="check" style="width: 60px"/>
          <a-icon
            type="check"
            class="editable-cell-icon-check"
            @click="check"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ value }}
          <a-icon type="edit" class="editable-cell-icon" @click="edit"/>
        </div>
      </div>
    `,
  props: {
    id: Number,
    text: Number
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      value: this.text,
      editable: false
    }
  },
  methods: {
    handleChange (e) {
      const value = e.target.value
      console.log(value)
      console.log(typeof value)
      this.value = value
    },
    check () {
      console.log('check', this.value, this.id)
      this.axios
        .get('/test-result/writeOneTestResult', {
          params: {
            id: this.id,
            cent: this.value
          }
        })
        .then(() => {
          this.editable = false
        })
    },
    edit () {
      this.editable = true
    }
  }
}
export default {
  components: {
    EditableCell
  },
  data () {
    return {
      gameNumberList: [
        { value: '1', name: '1' },
        { value: '2', name: '2' },
        { value: '3', name: '3' },
        { value: '4', name: '4' },
        { value: '5', name: '5' },
        { value: '6', name: '6' },
        { value: '7', name: '7' }
      ],
      gameRoundList: [
        { value: '1', name: '1' },
        { value: '2', name: '2' },
        { value: '3', name: '3' }
      ],
      seatIdList: [
        { id: '1', name: '1' },
        { id: '2', name: '2' },
        { id: '3', name: '3' },
        { id: '4', name: '4' },
        { id: '5', name: '5' },
        { id: '6', name: '6' },
        { id: '7', name: '7' },
        { id: '8', name: '8' },
        { id: '9', name: '9' },
        { id: '10', name: '10' },
        { id: '11', name: '11' },
        { id: '12', name: '12' },
        { id: '13', name: '13' },
        { id: '14', name: '14' },
        { id: '15', name: '15' },
        { id: '16', name: '16' },
        { id: '17', name: '17' },
        { id: '18', name: '18' },
        { id: '19', name: '19' },
        { id: '20', name: '20' },
        { id: '21', name: '21' },
        { id: '22', name: '22' },
        { id: '23', name: '23' },
        { id: '24', name: '24' },
        { id: '25', name: '25' },
        { id: '26', name: '26' },
        { id: '27', name: '27' },
        { id: '28', name: '28' },
        { id: '29', name: '29' },
        { id: '30', name: '30' },
        { id: '31', name: '31' },
        { id: '32', name: '32' },
        { id: '33', name: '33' },
        { id: '34', name: '34' },
        { id: '35', name: '35' },
        { id: '36', name: '36' }
      ],
      form: {
        gameNumber: '',
        gameRound: '',
        seatId: ''
      },
      rules: {
        gameNumber: [{ required: true, message: '请选择轮次', trigger: 'change' }],
        gameRound: [{ required: true, message: '请选择场次', trigger: 'change' }],
        seatId: [{ required: true, message: '请选择裁判赛位', trigger: 'change' }]
      },
      columns,
      standardData: [],
      standardShow: false
    }
  },
  methods: {
    // 查询手动录入成绩
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.axios
            .get('/test-result/getWriteResultStandardVO', {
              params: {
                gameNumber: this.form.gameNumber,
                gameRound: this.form.gameRound,
                seatId: this.form.seatId
              }
            })
            .then(data => {
              console.log(data)
              this.standardData = data
              this.standardShow = true
            })
            .catch(err => {
              console.log(err)
              // 隐藏评分标准
              this.standardShow = false
            })
        }
      })
    },
    writeResultOk (id) {
      const that = this
      this.$confirm({
        title: '确认全部成绩补录完成，确认完成后成绩不可再次补录',
        onOk () {
          that.doWriteResultOk()
        },
        onCancel () {}
      })
    },
    // 确认全部修改成功，修改后不得再次手动录入成绩
    doWriteResultOk () {
      this.axios
        .get('/test-result/writeTestResultEnd', {
          params: {
            gameNumber: this.form.gameNumber,
            gameRound: this.form.gameRound,
            seatId: this.form.seatId
          }
        })
        .then(data => {
          console.log(data)
          // 全部成绩补录成功
          this.standardShow = false
          this.$message.success('裁判补录成绩成功')
        })
    },

    checkResult () {
      this.axios
        .get('/test-result/getTempResult?gameNumber=' + this.gameNumber + '&gameRound=' + this.gameRound)
        .then(data => {
          console.log(data)
          this.tempResult = data
        })
    },
    detail (studentId) {
      this.axios
        .get(
          '/test-result/getResultByStudentCode?gameNumber=' +
            this.gameNumber +
            '&gameRound=' +
            this.gameRound +
            '&studentId=' +
            studentId
        )
        .then(data => {
          this.resultDetail = data
        })
      console.log(this.resultDetail)
      this.showModal()
    },
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    showChangeDrawer (studentId) {
      this.changeResultVisible = true
      // this.axios.get('/test-result/getResultByStudentCode?gameNumber=' + this.gameNumber + '&gameRound=' + this.gameRound + '&studentId=' + studentId).then(data => {
      //   this.resultDetail = data
      // })
      this.axios
        .get(
          '/test-result/getResultByStudentCode?gameNumber=' +
            this.gameNumber +
            '&gameRound=' +
            this.gameRound +
            '&studentId=' +
            studentId
        )
        .then(data => {
          console.log(data)
          this.resultDetailOne = data.testResultDetailVOListOne
          this.resultDetailTwo = data.testResultDetailVOListTwo
        })
    },
    showDrawer (studentId) {
      this.resultVisible = true
      // this.axios.get('/test-result/getResultByStudentCode?gameNumber=' + this.gameNumber + '&gameRound=' + this.gameRound + '&studentId=' + studentId).then(data => {
      //   this.resultDetail = data
      // })
      this.axios
        .get(
          '/test-result/getResultByStudentCode?gameNumber=' +
            this.gameNumber +
            '&gameRound=' +
            this.gameRound +
            '&studentId=' +
            studentId
        )
        .then(data => {
          console.log(data)
          this.resultDetailOne = data.testResultDetailVOListOne
          this.resultDetailTwo = data.testResultDetailVOListTwo
        })
    },
    onClose () {
      this.changeResultVisible = false
      this.resultVisible = false
    },
    onCellChange (key, dataIndex, value) {
      const dataSourceOne = [...this.resultDetailOne]
      const dataSourceTwo = [...this.resultDetailTwo]
      const targetOne = dataSourceOne.find(item => item.key === key)
      if (targetOne) {
        targetOne[dataIndex] = value
        this.resultDetailOne = dataSourceOne
      }
      const targetTwo = dataSourceTwo.find(item => item.key === key)
      if (targetTwo) {
        targetTwo[dataIndex] = value
        this.resultDetailTwo = dataSourceTwo
      }
    }
  }
}
</script>

<style scoped>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
