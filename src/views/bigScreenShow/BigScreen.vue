<template>
  <div class="page-container">
    <dv-loading v-if="loading">加载数据中...</dv-loading>
    <dv-full-screen-container v-else>
      <div class="header-container">
        <dv-decoration-8 class="header-left-decoration" />
        <div class="header-center-container">
          <div class="header-center-title">
            “新誉杯”全国通信专业技能竞赛
          </div>
          <dv-decoration-5 :dur="3" class="header-center-decoration" />
        </div>
        <dv-decoration-8 class="header-right-decoration" :reverse="true" />
      </div>
      <dv-border-box-1 class="main-container">
        <div class="main-header-container">
          <div class="main-header-left-container">
            <dv-border-box-12> 当前时间：{{ competition.dateTime }} </dv-border-box-12>
          </div>
          <div class="main-header-center-container">
            <dv-decoration-7 class="main-header-center-decoration">
              <div class="main-header-center-title">
                <div>第</div>
                <div class="main-header-center-number-card">
                  {{ competition.gameNumber }}
                </div>
                <div>场</div>
                <div>第</div>
                <div class="main-header-center-number-card">
                  {{ competition.gameRound }}
                </div>
                <div>轮</div>
              </div>
            </dv-decoration-7>
          </div>
          <div class="main-header-right-container">
            <div class="digital-flop-item" v-for="item in digitalFlopData" :key="item.title" style="width: 150px;">
              <div class="digital-flop-title">{{ item.title }}</div>
              <div class="digital-flop">
                <dv-digital-flop :config="item.number" style="width:100px;height:50px;" />
                <div class="unit">{{ item.unit }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-content-container">
          <dv-border-box-11
            v-for="groupShow in competition.groupShowVOList"
            :key="groupShow.groupName"
            :title="groupShow.groupName"
            :color="['rgb(8, 229, 255)', 'rgba(4, 49, 128, 0.6)']"
          >
            <template v-for="(typeShow, index) in groupShow.typeShowVOList">
              <div :key="typeShow.typeName" class="main-content-card">
                <dv-decoration-11 class="main-content-card-header">
                  {{ typeShow.typeName }}
                </dv-decoration-11>
                <dv-decoration-4
                  :reverse="true"
                  :color="['rgb(63, 150, 165)']"
                  class="main-content-card-icon-divider"
                />
                <div class="main-content-card-student">
                  <dv-border-box-9
                    :color="[typeShow.studentShowVO.stateColor, typeShow.studentShowVO.stateColor]"
                    class="main-content-card-student-img"
                  >
                    <img :src="typeShow.studentShowVO.idCard" />
                  </dv-border-box-9>
                </div>
                <dv-decoration-4
                  :reverse="true"
                  :color="['rgb(63, 150, 165)']"
                  class="main-content-card-icon-divider"
                />
                <div class="main-content-card-judge">
                  <dv-border-box-9
                    v-for="judgeShow in typeShow.judgeShowVOList"
                    :key="judgeShow.name"
                    :color="[judgeShow.stateColor, judgeShow.stateColor]"
                    class="main-content-card-judge-img"
                  >
                    <img :src="judgeShow.idCard" />
                    <!--  <img src="../../assets/a.png" />-->
                  </dv-border-box-9>
                </div>
              </div>
              <dv-decoration-4
                v-if="index < groupShow.typeShowVOList.length - 1"
                :key="`${typeShow.typeName}-divider`"
                :color="['rgb(63, 150, 165)']"
                class="main-content-card-divider"
              />
            </template>
          </dv-border-box-11>
        </div>
        <div class="main-footer-container">
          <div v-for="legend in legendList" :key="legend.type" class="main-footer-label-tag">
            <span>{{ legend.type }}：</span>
            <div class="main-footer-label-item" v-for="value in legend.value" :key="value.label">
              <div :style="`background-color: ${value.color};`" />
              {{ value.label }}
            </div>
          </div>
        </div>
      </dv-border-box-1>
    </dv-full-screen-container>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  fullScreenContainer,
  loading,
  borderBox1,
  borderBox9,
  borderBox11,
  borderBox12,
  decoration1,
  decoration4,
  decoration5,
  decoration7,
  decoration8,
  decoration11,
  digitalFlop
} from '@jiaminghi/data-view'

Vue.use(fullScreenContainer)
Vue.use(loading)
Vue.use(borderBox1)
Vue.use(borderBox9)
Vue.use(borderBox11)
Vue.use(borderBox12)
Vue.use(decoration1)
Vue.use(decoration4)
Vue.use(decoration5)
Vue.use(decoration7)
Vue.use(decoration8)
Vue.use(decoration11)
Vue.use(digitalFlop)

export default {
  name: 'BigScreen',
  components: {},
  data () {
    return {
      loading: true,
      competition: null,
      digitalFlopData: [],
      legendList: [
        {
          type: '学生状态',
          value: [
            {
              state: 0,
              label: '未就绪',
              color: '#ffffff'
            },
            {
              state: 1,
              label: '已就绪',
              color: '#254000'
            },
            {
              state: 2,
              label: '比赛中',
              color: '#ffc530'
            },
            {
              state: 3,
              label: '比赛中断',
              color: '#3de7c9'
            },
            {
              state: 4,
              label: '比赛结束',
              color: '#a0d911'
            },
            {
              state: 5,
              label: '考生缺考',
              color: '#722ed1'
            },
            {
              state: 6,
              label: '考生违纪',
              color: '#f5222d'
            }
          ]
        },
        {
          type: '裁判状态',
          value: [
            {
              state: 1,
              label: '未就绪',
              color: '#ffffff'
            },
            {
              state: 2,
              label: '已就绪',
              color: '#00baff'
            },
            {
              state: 3,
              label: '监考中',
              color: '#3de7c9'
            },
            {
              state: 4,
              label: '成绩已提交',
              color: '#a0d911'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.timer = setInterval(this.init, 5000)
  },
  methods: {
    init () {
      // this.loading = true
      this.axios.get('/judge/getBigShowVO').then(data => {
        console.log(data)
        this.loading = false
        this.competition = data
        this.digitalFlopData = [
          {
            title: '候考区',
            number: {
              number: [this.competition.waitNumber],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#4d99fc',
                fontWeight: 'bold'
              }
            },
            unit: '人'
          },
          {
            title: '备考区',
            number: {
              number: [this.competition.readyNumber],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#4d99fc',
                fontWeight: 'bold'
              }
            },
            unit: '人'
          },
          {
            title: '考试中',
            number: {
              number: [this.competition.testNumber],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#f46827',
                fontWeight: 'bold'
              }
            },
            unit: '人'
          },
          {
            title: '已离场',
            number: {
              number: [this.competition.leaveNumber],
              content: '{nt}',
              textAlign: 'right',
              style: {
                fill: '#40faee',
                fontWeight: 'bold'
              }
            },
            unit: '人'
          }
        ]
      })
    }
  },
  destroyed () {
    // 页面销毁时结束轮询
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #ffffff;
}

#dv-full-screen-container {
  background-image: url('../../assets/bg.png');
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}

.header-container {
  height: 110px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
}

.header-left-decoration,
.header-right-decoration {
  width: 25%;
  height: 75px;
}

.header-center-container {
  flex-grow: 1;
  text-align: center;
}

.header-center-title {
  padding-top: 10px;
  font-size: 45px;
  font-weight: bold;
}

.header-center-decoration {
  margin: -10px auto 0;
  width: 80%;
  height: 60px;
}

.main-container {
  flex-grow: 1;
}

.main-container >>> .border-box-content {
  padding: 10px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.main-header-container {
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-header-left-container {
  flex: 1;
  font-weight: bold;
  font-size: 24px;
}

.main-header-left-container >>> .border-box-content {
  text-align: center;
  padding: 20px;
}

.main-header-center-container {
  flex: 1;
  justify-content: center;
}

.main-header-center-decoration {
  height: 50px;
}

.main-header-center-title {
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

.main-header-center-title > div:nth-child(3) {
  margin-right: 40px;
}

.main-header-center-number-card {
  height: 70px;
  width: 70px;
  margin: 10px;
  background-color: rgba(4, 49, 128, 0.6);
  color: rgb(8, 229, 255);
  font-size: 45px;
  font-weight: bold;
  line-height: 70px;
  text-align: center;
}

.main-header-right-container {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.digital-flop-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 3px solid rgb(6, 30, 93);
  border-right: 3px solid rgb(6, 30, 93);
}

.digital-flop-title {
  font-size: 20px;
  margin-bottom: 20px;
}

.digital-flop {
  display: flex;
}

.unit {
  margin-left: 10px;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding-bottom: 13px;
}

.main-content-container {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: grid;
  grid-template-rows: repeat(2, 50%);
  grid-template-columns: repeat(3, 33.33%);
}

.main-content-container >>> .border-box-content {
  padding: 55px 20px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}

.main-content-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.main-content-card-header {
  width: 150px;
  height: 60px;
}

.main-content-card-student {
  height: 100px;
}

.main-content-card-student-img >>> .border-box-content {
  padding: 10px 15px 10px 20px;
}

.main-content-card-student-img img {
  height: 100%;
  object-fit: scale-down;
}

.main-content-card-judge {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100px;
}

.main-content-card-judge-img >>> .border-box-content {
  padding: 10px 15px 10px 20px;
}

.main-content-card-judge-img img {
  height: 100%;
  object-fit: scale-down;
}

.main-content-card-icon-divider {
  width: 100%;
  height: 5px;
  padding: 5px;
}

.main-content-card-divider {
  width: 5px;
}

.main-footer-container {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-footer-label-tag {
  margin: 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-footer-label-item {
  margin: 0 10px;
  display: flex;
  align-items: center;
}

.main-footer-label-item > div {
  margin-right: 10px;
  width: 12px;
  height: 12px;
}
</style>
