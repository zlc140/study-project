### nuxt项目开发中遇到的问题及解决

 1. 引入less，不能只install less-loader ,还要install less, 不需配置，直接使用
 2. 使用scss node-sass sass-loader scss-loader --save-dev
 3. vuex 使用方法


      a.文件夹store下添加index,包含actions, mutations, state, getters...
      b.通过fetch调用store实例上的方法获取数据或者更新数据 
        i. store.dispath('') === 调用action获取异步数据=》mutation修改数据，一般用于异步获取数据
        ii. store.commit('',data) 修改数据，异步操作不在store中
        iii. store.getter.getStatus;获取想要的state值
      c.mapState state辅助函数，减少计算属性代码冗余重复
        computed: {
          ...mapState({
            status: 'status',
            status: (state) => state.status
          })
          ...mapState(['status'])
        }
      d. mapMutations 辅助函数
      ...mapMutations([
               'GET_STATUS' // GET_STATUS 映射到this.GET_STATUS(),进行commit
             ]),
             GET_STATUS() {
               this.$store.commit('GET_STATUS', 3)
             },
      e. 添加vuex之后可以通过this.$store直接获取相关方法和state
      f.直接在store下建模板文件可生成对应的模板store,是融合到总的store中的，（总的不能是createStore）

 4. vue报错
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
情况描述： 但组件中使用了template属性时会报错，或者既没有指定render也没有使用template
原因： Vue有两种模式，runtime Only(运行的js是编译好的，代码体积小) 和 runtion compiler(需要在客户端编译，所以代码体积较大)
解决： 1.尽量不使用template,用render
      2.在webpack设置中添加
```js
   resolve: {
        alias: {
          vue: 'vue/dist/vue.js'
        }
   }
```

> 5.添加组件plugins
  
```js
//引入插件
//message.js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr

miniToastr.init()

function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)

//nuxt.config.js
  plugins: [
    {src: '~/plugins/message'},
    {src: '~/plugins/vue-notifications', ssr: false} //只在客户端使用
  ]
  
  //自定义
  
  Vue.install = function(vue, options) {
   // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
      // 逻辑...
      console.log('myGlobalMethod')
    }
  
    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // 逻辑...
      }
    })
  
    // 3. 注入组件
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })
  
    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
      console.log('myMethod')
    }
  }
  
  //全局组件
  //component.js
  Vue.component(Dialog, Dialog);
  // main.js
  Vue.use(Dialog)
  
  
  
```

5.如果部署到静态服务器，要配置好ajax的代理，不然async中的请求容易请求不到数据导致页面刷新不出
proxy:nuxt可以在nuxt.config.js中设置proxy,从而达到本地开发的跨域请求
