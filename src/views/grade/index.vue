<template>
  <a-table :columns="columns" :data-source="data">
    <span slot="action" slot-scope="record">
      <!--      <a-input :value="record.id"><a-button slot="addonBefore">-</a-button><a-button slot="addonAfter">+</a-button></a-input>-->
      <!--      <a-input addon-before="-" addon-after="+" :value="record.score" :id="record.id"/>-->
      <a-input ref="userNameInput" v-model="record.id" placeholder="Basic usage">
        <a-icon slot="prefix" type="minus" />
        <a-tooltip slot="suffix" title="Extra information">
          <a-icon type="plus" style="color: rgba(0,0,0,.45)" @click="plusValue(record.id)" />
        </a-tooltip>
      </a-input>
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    title: '考核内容',
    dataIndex: 'text',
    key: 'text'
  },
  {
    title: '考核点',
    dataIndex: 'point',
    key: 'point'
  },
  {
    title: '分值',
    dataIndex: 'score',
    key: 'score'
  },
  {
    title: '评分标准',
    dataIndex: 'standard',
    key: 'standard'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 200
  }
]

const data = []

export default {
  data () {
    return {
      data,
      columns
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.axios.get('/grade/getStandard').then(data => {
        console.log(data)
        this.data = data
      })
    },
    plusValue () {
      console.log('++')
    }
  }
}
</script>
