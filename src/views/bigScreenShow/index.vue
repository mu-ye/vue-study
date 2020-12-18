<template>
  <div
    id="dv-full-screen-container"
    style="background-size: 100% 100%;
"
  >
    <div :class="classObject">场次： {{ groups.gameNumber }} 轮次： {{ groups.gameRound }}</div>
    <!--门户主页-->
    <div class="text-main">
      <div>
        <a-row :gutter="[16, 16]">
          <a-col class="gutter-row" :span="8" v-for="item in groups.groupShowVOList" :key="item.groupName">
            <div class="gutter-box">
              <a-card hoverable :bordered="true">
                <p style="text-align: center">
                  <b>{{ item.groupName }}</b>
                </p>
                <a-row :gutter="[16, 16]">
                  <a-col class="gutter-row" :span="8" v-for="type in item.typeShowVOList" :key="type.typeName">
                    <a-card hoverable :bordered="true" style="margin-top: 20px">
                      <p style="text-align: center">
                        <b>{{ type.typeName }}</b>
                      </p>
                      <a-row :gutter="16">
                        <a-col class="gutter-row" :span="24">
                          <a-card
                            v-if="type.studentShowVO !== null"
                            hoverable
                            :bordered="true"
                            :style="type.studentShowVO.stateColor"
                            :class="{ stateOk: type.studentShowVO.state, stateNo: !type.studentShowVO.state }"
                          >
                            <p style="text-align: center">
                              <b>{{ type.studentShowVO.studentName }}</b>
                            </p>
                          </a-card>
                          <a-card v-else hoverable :bordered="true" style="margin-top: 20px;background-color:#EEEEEE">
                            <p style="text-align: center">
                              <b>dd</b>
                            </p>
                          </a-card>
                        </a-col>
                        <a-col class="gutter-row" :span="12" v-for="judge in type.judgeShowVOList" :key="judge.code">
                          <a-card hoverable :bordered="true" :style="judge.stateColor">
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
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      groups: []
    }
  },
  mounted () {
    this.timer = setInterval(this.init, 1000)
  },
  methods: {
    init () {
      this.axios.get('/judge/getBigShowVO').then(data => {
        console.log(data)
        this.groups = data
      })
    }
  },

  computed: {
    classObject: function (a) {
      if (a === 1) {
        return {
          active: true,
          stateNo: true
        }
      } else {
        return {
          active: true,
          stateOk: true
        }
      }
    }
  }
}
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
.ant-card-body {
  padding: 24px 10px;
}
#dv-full-screen-container {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/bigShowBackImage.png');
}

.ant-card {
  color: #ffffff;
  background: none;
}

element.style {
  margin: 0px;
}
</style>
