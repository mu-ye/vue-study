<template>
  <div class="gutter-example">
    <div>
      <a-button type="primary" :disabled="!drawResult" @click="drawJudge"> 执行裁判抽签</a-button>
    </div>

    <!--门户主页-->

    <div v-if="!drawResult">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12" v-for="item in groups.groupShowVOList" :key="item.groupName">
          <div class="gutter-box">
            <a-card hoverable :bordered="true" style="margin-top: 20px">
              <p style="text-align: center">
                <b>{{ item.groupName }}</b>
              </p>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="8" v-for="judgeType in item.typeShowVOList" :key="judgeType.typeName">
                  <a-card hoverable :bordered="true" style="margin-top: 20px">
                    <p style="text-align: center">
                      <b>{{ judgeType.typeName }}</b>
                    </p>
                    <a-row :gutter="16">
                      <a-col class="gutter-row" :span="12" v-for="judge in judgeType.judgeShowVOList" :key="judge.code">
                        <a-card hoverable :bordered="true" style="margin-top: 20px">
                          <p style="text-align: center">
                            <b>{{ judge.name }}</b>
                          </p>
                        </a-card>
                      </a-col>
                    </a-row>
                  </a-card>
                </a-col>
              </a-row>
            </a-card>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      drawResult: false,
      groups: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 查看状态  0: 不可以抽签，不显示结果   1：可以抽签
      this.axios.get('/drawState/getStateById?id=5').then(data => {
        console.log('---- :' + data)
        if (data === 1) {
          // 抽签按钮可用
          this.drawResult = true
        } else {
          // 显示抽签结果
          this.getGroupJudgeVO()
        }
      })
    },
    // 显示抽签结果
    getGroupJudgeVO () {
      this.axios.get('/judge/getGroupJudgeVO').then(data => {
        this.drawResult = false
        console.log(data)
        this.groups = data
      })
    },

    drawJudge () {
      this.axios.get('/judge/judgeDraw').then(data => {
        this.$message.success('抽签成功')
        this.init()
      })
    }
  }
}
</script>
