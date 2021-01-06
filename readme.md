**1.  浏览器中全局 title 设置** 
    
    src ->config -> defaultSetting.js 中设置 [title] 名字
    
**2. 配置文件懒加载** 

    src->core->lazy_use.js
    
**3. 系统包管理**
        
    package.json 中进行操作
    
    1. 更新系统依赖包       yarn 
    2. service(启动项目)，快捷键  ctrl+shift+F10
    
**4. 页面中控件使用， 以 <a-tree> 为例**

     <a-tree
        checkable                             # 控件参数，直接等于值即可             
        :tree-data="treeData"                 # 控件参数，取 data 中的值
        v-model:expandedKeys="expandedKeys"
        @select="onSelect"                    # 控件中的事件
      >

**5. 基本页面调用关系**

        layouts - > BasicLayout.vue 中整合了整个后台管理系统的通用部分
            1. 右侧内容               @/components/GlobalHeader/RightContent
                  AvatarDropdown     @components/GlobalHeader/AvatarDropdown
            2. 底部内容               @/components/GlobalFooter
            3. 管理系统的logo         ../assets/logo.svg?inline
            
        eg: 页面中导入自定义组件：
        
        import RightContent from '@/components/GlobalHeader/RightContent'
        export default {
         components: {
              RightContent
            }
         }
     
   
**6. 基础路径**
   
         <img src="~@/assets/maker.png"/>   @ 代指 src