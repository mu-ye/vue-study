<template>
  <div>

    <a-alert
      message="提示信息！"
      description="当出现警告图标时，表示对于统一考生的打分，分差大于10，请核查"
      type="warning"
      show-icon
    />

    <a-card style="width: 100%;margin: 24px 0">
      <a-row>
        <a-col span="8">
          场次:
          <a-select default-value="1" style="width: 240px" v-model="gameNumber">
            <a-select-option value="1" key="1">
              1
            </a-select-option>
            <a-select-option value="2" key="2">
              2
            </a-select-option>
            <a-select-option value="3" key="3">
              3
            </a-select-option>
            <a-select-option value="4" key="4">
              4
            </a-select-option>
            <a-select-option value="5" key="5">
              5
            </a-select-option>
            <a-select-option value="6" key="6">
              6
            </a-select-option>
            <a-select-option value="7" key="7">
              7
            </a-select-option>
          </a-select>
        </a-col>
        <a-col span="8">
          轮次:
          <a-select default-value="1" style="width: 240px" v-model="gameRound">
            <a-select-option value="1">
              1
            </a-select-option>
            <a-select-option value="2">
              2
            </a-select-option>
            <a-select-option value="3">
              3
            </a-select-option>
          </a-select>
        </a-col>
        <a-col span="8">
          <a-button type="primary" @click="checkResult">查看</a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-card>
      <a-table
        :columns="columns"
        :data-source="tempResult"
        bordered
        :pagination="false"
        rowKey="id"
      >
        <span slot="action" slot-scope="text,record">
          <div v-if="record.flag === 1"><a-icon
            type="warning"
            style="color: #ff0000"
            @click="showChangeDrawer(record.studentId)"
          ></a-icon>
          </div>
          <div v-else>
            <a-button type="primary" size="small" @click="showDrawer(record.studentId)">详情</a-button>
          </div>
        </span>
      </a-table>
    </a-card>
    <a-drawer
      title="结果修正"
      width="100%"
      :visible="changeResultVisible"
      :body-style="{ paddingBottom: '80px' }"
      :destroyOnClose="true"
      @close="onClose"
    >
      <a-row>
        <a-col span="16">
          <a-table
            :columns="columnsDetailOne"
            :data-source="resultDetailOne"
            bordered
            :pagination="false"
            rowKey="id"
            style="background-color: #FFFFFF"
            size="small"
          >
            <template slot="cent" slot-scope="text, record">
              <editable-cell :id="record.id" :text="text" @change="onCellChange(record.key, 'cent', $event)"/>
            </template>
          </a-table>
        </a-col>
        <a-col span="8">
          <a-table
            :columns="columnsDetailTwo"
            :data-source="resultDetailTwo"
            bordered
            :pagination="false"
            rowKey="id"
            style="background-color: #FFFFFF"
            size="small"
          >
            <template slot="cent" slot-scope="text, record">
              <editable-cell :id="record.id" :text="text" @change="onCellChange(record.key, 'cent', $event)"/>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-drawer>
    <a-drawer
      title="详细打分结果"
      width="100%"
      :visible="resultVisible"
      :body-style="{ paddingBottom: '80px' }"
      :destroyOnClose="true"
      @close="onClose"
    >
      <a-row>
        <a-col span="16">
          <a-table
            :columns="columnsDetailOne"
            :data-source="resultDetailOne"
            bordered
            :pagination="false"
            rowKey="id"
            style="background-color: #FFFFFF"
            size="small"
          >
          </a-table>
        </a-col>
        <a-col span="8">
          <a-table
            :columns="columnsDetailTwo"
            :data-source="resultDetailTwo"
            bordered
            :pagination="false"
            rowKey="id"
            style="background-color: #FFFFFF"
            size="small"
          >
          </a-table>
        </a-col>
      </a-row>
    </a-drawer>
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
      title: '学生编号',
      dataIndex: 'studentCode',
      key: 'studentCode'
    },
    {
      title: '学生姓名',
      dataIndex: 'studentName',
      key: 'studentName'
    },
    {
      title: '裁判Id',
      dataIndex: 'judgeId',
      key: 'judgeId'
    },
    {
      title: '裁判',
      dataIndex: 'judgeName',
      key: 'judgeName'
    },
    {
      title: '得分',
      dataIndex: 'result',
      key: 'result'
    },
    {
      title: '异常',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ]
  const columnsDetailOne = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '学生编号',
      dataIndex: 'studentCode',
      key: 'studentCode'
    },
    {
      title: '考生',
      dataIndex: 'studentName',
      key: 'studentName'
    },
    // {
    //   title: '裁判Id',
    //   dataIndex: 'judgeId',
    //   key: 'judgeId'
    // },
    {
      title: '题目',
      dataIndex: 'questionName',
      key: 'questionName'
    },
    {
      title: '打分项',
      dataIndex: 'questionStandardName',
      key: 'questionStandardName'
    },
    {
      title: '裁判',
      dataIndex: 'judgeName',
      key: 'judgeName'
    },
    {
      title: '得分',
      dataIndex: 'cent',
      scopedSlots: { customRender: 'cent' }
    }
  ]
  const columnsDetailTwo = [
    {
      title: '得分',
      dataIndex: 'cent',
      scopedSlots: { customRender: 'cent' }
    },
    {
      title: '裁判姓名',
      dataIndex: 'judgeName',
      key: 'judgeName'
    },
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }
    // {
    //   title: '题目',
    //   dataIndex: 'questionName',
    //   key: 'questionName'
    // },
    // {
    //   title: '打分项',
    //   dataIndex: 'questionStandardName',
    //   key: 'questionStandardName'
    // },

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
        value: this.text,
        editable: false
      }
    },
    methods: {
      handleChange (e) {
        const value = e.target.value
        console.log(value)
        console.log(typeof (value))
        this.value = value
      },
      check () {
        console.log('check', this.value, this.id)
        this.axios.get('/test-result/editCent?id=' + this.id + '&cent=' + this.value).then(() => {
          this.editable = false
          // 转换成Number
          // this.$emit('change', this.value * 1)
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
        columns,
        columnsDetailOne,
        columnsDetailTwo,
        gameNumber: 1,
        gameRound: 1,
        resultDetailOne: [],
        resultDetailTwo: [],
        tempResult: [],
        visible: false,
        changeResultVisible: false,
        resultVisible: false
      }
    },
    methods: {
      checkResult () {
        this.axios.get('/test-result/getTempResult?gameNumber=' + this.gameNumber + '&gameRound=' + this.gameRound).then(data => {
          console.log(data)
          this.tempResult = data
        })
      },
      detail (studentId) {
        this.axios.get('/test-result/getResultByStudentCode?gameNumber=' + this.gameNumber + '&gameRound=' + this.gameRound + '&studentId=' + studentId).then(data => {
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
        this.axios.get('/test-result/getResultByStudentCode?gameNumber=' + this.gameNumber + '&gameRound=' + this.gameRound + '&studentId=' + studentId).then(data => {
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
        this.axios.get('/test-result/getResultByStudentCode?gameNumber=' + this.gameNumber + '&gameRound=' + this.gameRound + '&studentId=' + studentId).then(data => {
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
