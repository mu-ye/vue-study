<template>
  <div>
    <a-tree
      :load-data="onLoadData"
      :tree-data="treeData"
      :checkable="checkAble"
      @expand="onExpand"
      @load="onLoad"
      @check="onCheck"
      @select="onSelect" />
  </div>
</template>

<script>

  export default {
    data () {
      return {
        checkAble: true,
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
        console.log('点击节点时触发')
        console.log('获取点击节点的key:', info.node.dataRef.key)
        console.log('获取点击节点的title:', info.node.dataRef.title)
        console.log('获取点击节点的isLeaf:', info.node.dataRef.isLeaf)
      },
      onCheck (checkedKeys, info) {
        console.log('选中节点时触发')
        // 获取全部选中的节点
        console.log('选中节点数目', checkedKeys.valueOf().length)
        console.log('选中第一个节点key:', checkedKeys.valueOf()[0])
        // 点击复选框就会执行的操作
        console.log('获取点击复选框的key:', info.node.dataRef.key)
        console.log('获取点击复选框的title:', info.node.dataRef.title)
        console.log('获取点击复选框的isLeaf:', info.node.dataRef.isLeaf)
      },
      onLoad (event, node) {
        /**
         *  查看操作手册，打印参数信息。json 类型的数据直接 . 获取，比如 node.node;
         *  如果 node 是 : VueComponent（Vue 组件）
         */
        console.log('节点数据加载完成时调用')
        console.log('event:', event)
        console.log('node:', node)
        console.log('node.node.dataRef.key:', node.node.dataRef.key)
      },
      onExpand (expandedKeys, info) {
        console.log('节点展开或收起时触发')
        // 所有展开节点
        console.log('expandedKeys：', expandedKeys)
        // 遍历所有展开节点
        const expandNodeLength = expandedKeys.valueOf().length
        const ExpandNodeArray = []
        for (let i = 0; i < expandNodeLength; i++) {
          ExpandNodeArray[i] = expandedKeys.valueOf()[i]
        }
        console.log('所有展开节点key数组 ExpandNodeArray:', ExpandNodeArray)
        // 当前节点
        console.log('info：', info)
      }
    }
  }
</script>
