<template>
  <div class="page-container">
    <dv-loading v-if="loading">加载数据中...</dv-loading>
    <dv-full-screen-container v-else>
      <div class="header-container">
        <dv-decoration-8 class="header-left-decoration" />
        <div class="header-center-container">
          <div class="header-center-title">“新誉杯”全国通信专业技能竞赛</div>
          <dv-decoration-5 :dur="3" class="header-center-decoration" />
        </div>
        <dv-decoration-8 class="header-right-decoration" :reverse="true" />
      </div>
      <dv-border-box-1 class="main-container">
        <div class="main-header-container">
          <dv-decoration-1 class="main-header-left-decoration" />
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
          <dv-decoration-1 class="main-header-right-decoration" />
        </div>
        <div class="main-content-container">
          <dv-border-box-11
            v-for="groupShow in competition.groupShowVOList"
            :key="groupShow.groupName"
            :title="groupShow.groupName"
            :color="['rgb(8, 229, 255)', 'rgba(4, 49, 128, 0.6)']"
          >
            <dv-decoration-4 :color="['rgb(63, 150, 165)']" class="main-content-card-divider" />
            <template v-for="typeShow in groupShow.typeShowVOList">
              <div :key="typeShow.typeName" class="main-content-card">
                <dv-decoration-11 class="main-content-card-header">
                  {{ typeShow.typeName }}
                </dv-decoration-11>
                <dv-decoration-4
                  :reverse="true"
                  :color="['rgb(63, 150, 165)']"
                  class="main-content-card-icon-divider"
                />
                <div class="main-content-card-icon">
                  <svg
                    t="1602487954717"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8670"
                    width="40"
                    height="40"
                    :fill="typeShow.studentShowVO.stateColor"
                  >
                    <path
                      d="M505.6 211.2m-211.2 0a211.2 211.2 0 1 0 422.4 0 211.2 211.2 0 1 0-422.4 0Z"
                      p-id="8671"
                    ></path>
                    <path
                      d="M908.8 870.4v-6.4l-64-224c-6.4-19.2-25.6-25.6-44.8-19.2-19.2 6.4-25.6 25.6-19.2 44.8l64 224v6.4h-172.8c-6.4 0-12.8-6.4-12.8-6.4L563.2 576c-12.8-44.8-57.6-134.4-198.4-134.4-172.8 0-211.2 153.6-211.2 153.6L57.6 1004.8c0 6.4 6.4 12.8 12.8 12.8h390.4c-6.4-6.4-12.8-12.8-12.8-25.6l-38.4-262.4c0-19.2 12.8-25.6 12.8-12.8l83.2 249.6c6.4 19.2 19.2 38.4 38.4 44.8 12.8 6.4 32 12.8 44.8 12.8H902.4c44.8 0 76.8-32 76.8-76.8-6.4-38.4-38.4-70.4-70.4-76.8z"
                      p-id="8672"
                    ></path>
                  </svg>
                  {{ typeShow.studentShowVO.studentName }}
                </div>
                <dv-decoration-4
                  :reverse="true"
                  :color="['rgb(63, 150, 165)']"
                  class="main-content-card-icon-divider"
                />
                <div v-for="judgeShow in typeShow.judgeShowVOList" :key="judgeShow.name" class="main-content-card-icon">
                  <svg
                    t="1602488066202"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="17696"
                    width="60"
                    height="60"
                    :fill="judgeShow.stateColor"
                  >
                    <path
                      d="M191.36 911.104c0-113.904-0.24-227.808 0.64-341.68 0.16-20.096 2.912-40.8 8.336-60.096 13.04-46.288 57.328-74.384 105.472-70.944 49.36 3.536 86.592 30.064 122 61.024 45.376 39.664 91.008 79.056 137.12 119.088l68.144-75.328h-108.368c3.2-9.44 5.728-17.28 8.544-25.056 31.136-86.688 62.336-173.376 93.472-260.08 2-5.552 3.664-9.664 11.44-9.632 76.72 0.368 153.44 0.224 231.664 0.224-1.456 5.328-2.416 9.872-3.968 14.208-27.392 75.952-54.992 151.824-82.144 227.856-1.872 5.248-2.272 12-0.784 17.344 6.352 22.88 3.008 43.264-12.288 61.824-38.112 46.256-75.968 92.688-113.936 139.04-11.872 14.512-23.44 29.328-35.808 43.408-26.32 29.952-61.888 32.8-93.376 8.144-21.792-17.024-43.68-33.904-67.136-52.096-1.744 24.192-3.472 46.656-4.928 69.136-1.984 30.512-3.376 61.072-5.68 91.584a91.152 91.152 0 0 0 8.336 46.064m351.136-622.832c-48.848 0-95.344-0.192-141.808 0.384-3.536 0.032-8.816 4.928-10.224 8.704-14.032 37.6-27.408 75.44-41.008 113.2-10.128 28.176-20.32 56.352-30.816 85.504 4.976 0.224 8.528 0.528 12.096 0.528 42.016 0.032 84.048-0.288 126.064 0.272 8.56 0.112 12.064-2.8 14.768-10.416 15.392-43.568 31.264-86.976 46.896-130.464 7.936-22.064 15.696-44.208 24.032-67.712z"
                      p-id="17697"
                    ></path>
                    <path
                      d="M332.848 401.312c-80.256 0.368-145.616-64.432-146.672-145.392-1.04-79.216 65.584-146.544 145.44-147.008 80.512-0.464 146.944 65.536 147.36 146.432 0.4 79.68-65.568 145.6-146.128 145.968z"
                      p-id="17698"
                    ></path>
                  </svg>
                  {{ judgeShow.name }}
                </div>
                <dv-decoration-4
                  :reverse="true"
                  :color="['rgb(63, 150, 165)']"
                  class="main-content-card-icon-divider"
                />
              </div>
              <dv-decoration-4
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
  borderBox8,
  borderBox11,
  decoration1,
  decoration4,
  decoration5,
  decoration7,
  decoration8,
  decoration11
} from '@jiaminghi/data-view'

Vue.use(fullScreenContainer)
Vue.use(loading)
Vue.use(borderBox1)
Vue.use(borderBox8)
Vue.use(borderBox11)
Vue.use(decoration1)
Vue.use(decoration4)
Vue.use(decoration5)
Vue.use(decoration7)
Vue.use(decoration8)
Vue.use(decoration11)

export default {
  name: 'BigScreen',
  components: {},
  data () {
    return {
      loading: true,
      competition: null,
      legendList: [
        {
          type: '学生状态',
          value: [
            {
              state: 1,
              label: '就绪',
              color: '#00baff'
            },
            {
              state: 2,
              label: '比赛中',
              color: '#3de7c9'
            },
            {
              state: 3,
              label: '比赛中断',
              color: '#ffc530'
            },
            {
              state: 4,
              label: '比赛结束',
              color: '#ffffff'
            }
          ]
        },
        {
          type: '裁判状态',
          value: [
            {
              state: true,
              label: '在场',
              color: '#00baff'
            },
            {
              state: false,
              label: '离场',
              color: '#ffc530'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.loading = true
    this.timer = setInterval(this.init, 1000)
  },
  methods: {
    init () {
      this.axios.get('/judge/getBigShowVO').then(data => {
        console.log(data)
        this.loading = false
        this.competition = data
      })
    }
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
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-header-left-decoration,
.main-header-right-decoration {
  width: 400px;
  height: 50px;
}

.main-header-center-decoration {
  height: 50px;
  flex-grow: 1;
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

.main-content-container {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: grid;
  grid-template-rows: repeat(auto-fill, 400px);
  grid-template-columns: repeat(auto-fill, 600px);
  row-gap: 20px;
  column-gap: 40px;
}

.main-content-container >>> .border-box-content {
  padding: 60px 30px 30px;
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

.main-content-card-icon {
  display: flex;
  align-items: center;
}

.main-content-card-icon-divider {
  width: 100%;
  height: 5px;
}

.main-content-card-divider {
  width: 5px;
  height: 96.5%;
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
