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
   module.exports = {
     devServer: {
       proxy: {
         '/api': {
           target: 'http://localhost:8001',
           ws: true,
           changeOrigin: true,
           pathRewrite:{
             '^/api': ''
           }
         }
       }
     }
   }
   ```

3. axios需要关心的就是Content-Type的设置

   ```
   // 1. Content-Type: application/json
   axios.post(`/test/testRequest`,{name:'zs',age:24}).then(res=>{
     console.log('res=>',res)
   })
   //====> 对应浏览器请求体名字为  Request Payload
   
   // 2.Content-Type: multipart/form-data
   let data = new FormData();
   data.append('code','1234');
   data.append('name','yyyy');
   axios.post(`${this.$url}/test/testRequest`,data)
   .then(res=>{
       console.log('res=>',res);            
   })
   //====>对应浏览器请求体名字为  Request Payload
   
   
   
   // 3. Content-Type: application/x-www-form-urlencoded
   import qs from 'Qs'
   let data = {"code":"1234","name":"yyyy"};
   axios.post(`/test/testRequest`,qs.stringify({
       data
   }))
   .then(res=>{
       console.log('res=>',res);            
   })
   
   //===> 对应浏览器请求体名字为 Form Data
   ```

   

4. 关于后台使用java时，获取参数采用@RequestParam，这是通过从字符串中解析参数；这个时候对应前端需要使用`application/x-www-form-urlencoded`这是请求类型时后端才能认识,或者也可以叫后端改为@RequestBody 这样就可以从请求体中获取参数

   ```
   // https://blog.csdn.net/csdn_yudong/article/details/79668655  6种方法
   //1.1 常见的一种，在拦截器里配置
   axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
   或者下面这句话，
   {headers:{'Content-Type':'application/x-www-form-urlencoded'}}
   
   // 1.2 然后使用qs将对象转换为字符串的query参数，  类似于name=123&age=33&addr=beijin
   
   import Qs from 'qs'
   // 拦截器里面
   config.data = Qs.stringify(config.data)
   ```

   