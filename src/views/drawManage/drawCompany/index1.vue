<template>
  <div>
    <a-row>
      <a-col :span="8" style="text-align: center">
        <div>
          <a-card size="small" title="待抽签代表队" style="width: 300px;float: right">
            <p v-for="(item, key) in forDrawCompany" :key="key">{{ item }}</p>
          </a-card>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="text-align: center; margin-top: 50px">
          <a-button :disabled="!drawFlag" type="primary" @click="startDraw">开始抽签</a-button>
        </div>
      </a-col>
      <a-col :span="8" style="text-align: center" v-if="!drawFlag">
        <a-card size="small" title="抽签结果" style="width: 300px">
          <!--          <p v-for="(item, key) in drawResult" :key="key">{{ item.drawResult }}{{ item.name }} </p>-->
          <a-table
            :columns="columns"
            :data-source="drawResult"
            bordered
            :pagination="false"
            rowKey="drawResult"
            size="small"
          ></a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  const columns = [
    {
      title: '顺序',
      className: 'drawResult',
      dataIndex: 'drawResult',
      key: 'drawResult'
    },
    {
      title: '代表队',
      className: 'name',
      dataIndex: 'name',
      key: 'name'
    }
  ]
  export default {
    data () {
      return {
        columns,
        forDrawCompany: [],
        drawResult: [],
        drawFlag: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.axios.get('/company/getHaveSighCompany').then(data => {
          this.forDrawCompany = data
        })
        this.axios.get('/drawState/getStateById?id=1').then(data => {
          if (data === 1) {
            console.log(data)
            // 抽签按钮可用
            this.drawFlag = true
          } else {
            this.axios.get('/company/getCompanyList').then(data => {
              this.drawResult = data
              data.sort((a, b) => {
                return a.drawResult - b.drawResult
              })
            })
          }
        })
      },
      startDraw () {
        this.axios.get('/company/drawCompany').then(data => {
          this.drawFlag = false
          this.drawResult = data
          data.sort((a, b) => {
            return a.drawResult - b.drawResult
          })
        })
      }
    }
  }
</script>

<style scoped></style>
