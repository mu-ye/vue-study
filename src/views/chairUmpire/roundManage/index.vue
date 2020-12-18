<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card size="small">
          <a-row style="margin-top: 18px">
            <a-col :span="3" :offset="3" style="font-size: x-large">
              <b
              ><p>当前比赛场次：{{ configVO.gameNumber }}</p></b
              >
            </a-col>
            <a-col :span="3" :offset="1" style="font-size: x-large">
              <b
              ><p>当前比赛轮次：{{ configVO.gameRound }}</p></b
              >
            </a-col>
            <a-col :span="2" :offset="1">
              <a-button type="primary" class="button" :disabled="nextState" @click="doNext">下一场</a-button>
            </a-col>
            <a-col :span="2" :offset="1">
              <a-button type="primary" class="button" :disabled="drawState" @click="doDraw">抽题</a-button>
            </a-col>
            <a-col :span="2" :offset="1">
              <a-button type="primary" class="button" :disabled="issueState" @click="doIssue">下发</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <br />
    <a-row :gutter="[16, 16]">
      <a-col :span="18">
        <a-card size="small">
          <a-row style="margin-top: 18px">
            <a-col :span="10" :offset="1">
              <a-table :columns="studentColumns" :data-source="studentData" bordered :pagination="false" rowKey="code">
                <span slot="studentSeatAction" slot-scope="text, record">
                  <div class="colorLink">
                    <b>{{ record.seatName }}</b>
                  </div>
                </span>

                <span slot="studentCodeAction" slot-scope="text, record">
                  <div class="colorLink">
                    <b>{{ record.code }}</b>
                  </div>
                </span>

                <span slot="studentAction" slot-scope="text, record">
                  <div v-if="record.state === 0" class="colorError"><b>未签到</b></div>
                  <div v-if="record.state === 1"><b>考生就绪</b></div>
                  <div v-if="record.state === 2" class="colorLink"><b>考试中</b></div>
                  <div v-if="record.state === 3" class="colorError"><b>比赛中断</b></div>
                  <div v-if="record.state === 4" class="colorSuccess"><b>比赛结束</b></div>
                  <div v-if="record.state === 5" class="colorError"><b>考生缺考</b></div>
                  <div v-if="record.state === 6" class="colorError"><b>考生违纪</b></div>
                </span>
                <span slot="studentMissAction" slot-scope="text, record">
                  <div v-if="record.state === 0">
                    <a-tag @click="studentMiss(record.id)" class="colorError">
                      <b>是否缺考</b>
                    </a-tag>
                  </div>
                  <div v-if="record.state === 2">
                    <a-tag @click="studentError(record.id)" class="colorError">
                      <b>是否违纪</b>
                    </a-tag>
                  </div>
                  <div v-if="record.state !== 2 && record.state !== 0">
                    -
                  </div>
                </span>
              </a-table>
            </a-col>
            <a-col :span="6" :offset="1">
              <a-table :columns="judgeColumns" :data-source="leftJudgeData" bordered :pagination="false" rowKey="code">
                <span slot="judgeState" slot-scope="text, record">
                  <div v-if="record.state === 0" class="colorError"><b>未就绪</b></div>
                  <div v-if="record.state === 1"><b>已就绪</b></div>
                  <div v-if="record.state === 2" class="colorLink"><b>监考中</b></div>
                  <div v-if="record.state === 3" class="colorSuccess"><b>已提交</b></div>
                </span>
                <span slot="judgeAction" slot-scope="text, record">
                  <div v-if="record.state === 2">
                    <a-tag @click="canWriteResult(record.id)" class="colorError">
                      <b>允许补录</b>
                    </a-tag>
                  </div>
                  <div v-else>
                    -
                  </div>
                </span>
              </a-table>
            </a-col>
            <a-col :span="6">
              <a-table :columns="judgeColumns" :data-source="rightJudgeData" bordered :pagination="false" rowKey="code">
                <span slot="judgeState" slot-scope="text, record">
                  <div v-if="record.state === 0" class="colorError"><b>未就绪</b></div>
                  <div v-if="record.state === 1"><b>已就绪</b></div>
                  <div v-if="record.state === 2" class="colorLink"><b>监考中</b></div>
                  <div v-if="record.state === 3" class="colorSuccess"><b>已提交</b></div>
                </span>
                <span slot="judgeAction" slot-scope="text, record">
                  <div v-if="record.state === 2">
                    <a-tag @click="canWriteResult(record.id)" class="colorError">
                      <b>允许补录</b>
                    </a-tag>
                  </div>
                  <div v-else>
                    -
                  </div>
                </span>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="6" v-if="judgeResultShow">
        <a-card size="small">
          <a-row style="margin-top: 18px">
            <a-col :span="22" :offset="1">
              <a-table
                :columns="questionColumns"
                :data-source="questionData"
                bordered
                :pagination="false"
                rowKey="code"
              ></a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const studentColumns = [
  {
    title: '考生赛位',
    className: 'seatName',
    scopedSlots: { customRender: 'studentSeatAction' },
    align: 'center'
  },
  {
    title: '考生编号',
    className: 'code',
    scopedSlots: { customRender: 'studentCodeAction' },
    align: 'center'
  },
  {
    title: '状态',
    className: 'state',
    scopedSlots: { customRender: 'studentAction' },
    align: 'center'
  },
  {
    title: '操作',
    className: 'state',
    scopedSlots: { customRender: 'studentMissAction' },
    align: 'center'
  }
]
const judgeColumns = [
  {
    title: '裁判编号',
    className: 'code',
    dataIndex: 'code',
    align: 'center'
  },
  {
    title: '状态',
    className: 'state',
    scopedSlots: { customRender: 'judgeState' },
    align: 'center'
  },
  {
    title: '操作',
    className: 'state',
    scopedSlots: { customRender: 'judgeAction' },
    align: 'center'
  }
]
const questionColumns = [
  {
    title: '题目类型',
    className: 'gameType',
    dataIndex: 'gameType',
    align: 'center'
  },
  {
    title: '题目名称',
    className: 'name',
    dataIndex: 'name',
    align: 'center'
  }
]
export default {
  data () {
    return {
      configVO: '',
      nextState: true,
      drawState: true,
      issueState: true,
      judgeResultShow: false,
      studentColumns,
      judgeColumns,
      questionColumns,
      studentData: [],
      judgeData: [],
      leftJudgeData: [],
      rightJudgeData: [],
      questionData: [],
      config: '',
      form: {
        id: 1,
        gameNumber: 0,
        gameRound: 0
      }
    }
  },
  mounted () {
    this.getConfigVO()
    this.stateTimer = setInterval(this.getState, 1000)
    this.studentTimer = setInterval(this.getStudentData, 1000)
    this.leftJudgeTimer = setInterval(this.getLeftJudgeData, 1000)
    this.rightJudgeTimer = setInterval(this.getRightJudgeData, 1000)
    this.questionTimer = setInterval(this.getQuestionData, 1000)
  },
  methods: {
    getConfigVO () {
      this.axios.get('/config/getInfo').then(data => {
        this.configVO = data
      })
    },
    getState () {
      this.axios.get('/config/getState').then(data => {
        switch (data) {
          case 0:
            this.nextState = true
            this.drawState = true
            this.issueState = true
            this.judgeResultShow = false
            break
          case 1:
            this.nextState = true
            this.drawState = false
            this.issueState = true
            this.judgeResultShow = false
            break
          case 2:
            this.nextState = true
            this.drawState = true
            this.issueState = false
            this.judgeResultShow = true
            break
          case 3:
            this.nextState = true
            this.drawState = true
            this.issueState = true
            this.judgeResultShow = true
            break
          case 4:
            this.nextState = false
            this.drawState = true
            this.issueState = true
            this.judgeResultShow = true
            break
        }
      })
    },
    getQuestionData () {
      this.axios.get('/questionDraw/getList').then(data => {
        this.questionData = data
      })
    },
    getStudentData () {
      this.axios.get('/seatDraw/getStudentReadyShowVO').then(data => {
        this.studentData = data
      })
    },
    getLeftJudgeData () {
      this.axios.get('/judgeDrawResult/getLeftJudgeReadyList').then(data => {
        this.leftJudgeData = data
      })
    },
    getRightJudgeData () {
      this.axios.get('/judgeDrawResult/getRightJudgeReadyList').then(data => {
        this.rightJudgeData = data
      })
    },
    handleSubmit () {
      this.axios.post('/config/setInfo', this.form).then(() => {
        this.$message.info('修改成功')
      })
    },
    doNextText () {
      this.axios.get('/config/doNext').then(data => {
        this.$message.success('切换场次成功')
        this.getConfigVO()
      })
    },
    doNext () {
      const that = this
      this.$confirm({
        title: '确认下发?',
        onOk () {
          that.doNextText()
        },
        onCancel () {}
      })
    },
    doDrawText () {
      this.axios.get('/questionDraw/doDraw').then(data => {
        this.$message.success('抽题成功')
      })
    },
    doDraw () {
      const that = this
      this.$confirm({
        title: '确认抽题?',
        onOk () {
          that.doDrawText()
        },
        onCancel () {}
      })
    },
    doIssueText () {
      this.axios.get('/config/doIssue').then(data => {
        this.$message.success('下发试卷试卷成功')
        this.issueState = true
      })
    },
    doIssue () {
      const that = this
      this.$confirm({
        title: '确认下发?',
        onOk () {
          that.doIssueText()
        },
        onCancel () {}
      })
    },
    doStudentMiss (id) {
      this.axios.get('/seatDraw/miss/beReady?seatDrawId=' + id).then(data => {
        this.$message.success('修改考生状态成功')
      })
    },
    doStudentError (id) {
      this.axios.get('/seatDraw/error/beReady?seatDrawId=' + id).then(data => {
        this.$message.success('修改考生状态成功')
      })
    },
    studentMiss (id) {
      const that = this
      this.$confirm({
        title: '确认缺考?',
        onOk () {
          that.doStudentMiss(id)
        },
        onCancel () {}
      })
    },
    studentError (id) {
      const that = this
      this.$confirm({
        title: '确认违纪?',
        onOk () {
          that.doStudentError(id)
        },
        onCancel () {}
      })
    },
    canWriteResult (id) {
      const that = this
      this.$confirm({
        title: '确认裁判手动录入成绩?',
        onOk () {
          that.doWriteResult(id)
        },
        onCancel () {}
      })
    },
    doWriteResult (id) {
      this.axios.get('/judgeDrawResult/judgeWriteResult/submit?judgeSeatId=' + id).then(data => {
        this.$message.success('修改裁判状态成功')
      })
    }
  },
  destroyed () {
    // 页面销毁时结束轮询
    clearInterval(this.studentTimer)
    clearInterval(this.leftJudgeTimer)
    clearInterval(this.rightJudgeTimer)
    clearInterval(this.stateTimer)
    clearInterval(this.questionTimer)
  }
}
</script>

<style scoped>
.button {
  width: 150px;
  height: 40px;
}

.colorSuccess {
  color: #52c41a;
}
.colorError {
  color: #ff4d4f;
}
.colorLink {
  color: #1890ff;
}
.colorWarning {
  color: #faad14;
}
</style>
