<template>
  <div>
    <p> </p>
    <a-tree :load-data="onLoadData" :tree-data="treeData" @select="onSelect" />
  </div>
</template>

<script>

  export default {
    data () {
      return {
        treeData: []
      }
    },
    mounted () {
      this.getFirstLevelData()
    },
    methods: {
      getFirstLevelData () {
        this.axios.get('/tree/getFirstLevelTreeVO?level=0').then(data => {
           console.log(data)
          this.treeData = data
          })
      },
      onLoadData (treeNode) {
        return new Promise(resolve => {
          if (treeNode.dataRef.children) {
            resolve()
            return
          }
          this.axios.get('/tree/getFirstLevelTreeVO?level=' + treeNode.dataRef.key).then(data => {
            console.log('treeNode.key' + treeNode.dataRef.key)
            treeNode.dataRef.children = data
            this.treeData = [...this.treeData]
            resolve()
          })
        })
      },
      onSelect (selectedKeys, info) {
        console.log('获取点击节点的key:', info.node.dataRef.key)
        console.log('获取点击节点的title:', info.node.dataRef.title)
        console.log('获取点击节点的isLeaf:', info.node.dataRef.isLeaf)
      }
    }
  }
</script>
