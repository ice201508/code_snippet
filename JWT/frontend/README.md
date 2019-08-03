### axios

1. 使用步骤，结合vue-axios使用，因为axios不是vue的插件

   ```
   // 第一种方式
   npm install axios vue-axios --save
   
   import axios from 'axios';
   import VueAxios from 'vue-axios'
   Vue.use(VueAxios, axios)
   
   然后再组件中使用方式
   this.axios(xxx)
   
   // 第二种方式，修改Vue的原型对象， 不推荐
   Vue.prototype.$http = axios
   
   // 第三种 结合vuex的actions
   每一个store文件都要引入axios，所有的请求放这里面增加了项目的复杂度
   ```

2. 设计到跨问题，开发的过程中，一般是设置一下浏览器的安全规则，禁用它就可以使用了； 从程序的角度上来说，就是在vue.config.js里面设置一个代理跨域

   ```
   aa
   ```

   