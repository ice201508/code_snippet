> You may use special comments to disable some warnings. 出现了这个问题，是由于eslint语法检查严格导致的

###### 解决eslint警告的几种方法

1. 在`vue.config.js`文件里面 添加一行代码,不做eslint检查

   ```
   chainWebpack: config => {
     config.module.rules.delete('eslint');
   },
   ```

2. 新建一个文件`.eslintrc`.js,里面添加对应的规则即可

   ```
   // 需要额外安装一个插件 eslint-plugin-html
   // npm install --save-dev eslint-plugin-html
   module.exports = {
     root: true,
     parserOptions: {
       sourceType: 'module'
     },
     // required to lint *.vue files
     plugins: [
       'html'
     ],
     // add your custom rules here
     'rules': {
       // allow debugger during development
       'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
     }
   }
   ```

   

3. `https://www.jianshu.com/p/bfc7e7329cff`添加`vue.config.js`文件中对应的属性

4. 修改`package.json`文件中对应的eslintConfig的配置项



###### 设置代理跨域的注意点

1. 设置全局的`axios的baseURL`时候，不能和之前一样写`localhost:8081`之类的，应该换成我们在`vue.config.js`文件中定义的proxy的key值

   ```
   module.exports = {
     devServer: {
       proxy: {
    		// 所有匹配到/api的路由都会给我们代理到8001这个地址   
         '/api': {
           target: 'http://localhost:8001',
           ws: true,
           changeOrigin: true,
           pathRewrite:{
           //这个是将所有的我们设置的/api路径去掉，所有的请求地址还是不变
             '^/api': ''
           }
         }
       }
     }
   }
   ```



### 用户认证与授权  JWT与Session

###### JWT

1. 这个案例我们使用两个npm插件

   - JsonWebToken 用作生成token `npm install jsonwebtoken --save`
   - `express-jwt` 用作验证指定的http请求的token是否有效 `npm install express-jwt --save`
   - `vue-localstorage` 这是一个代替原生localstorage的插件， `npm install vue-localstorage --save`

2. 服务器生成token

3. 客户端保存token，携带传递进服务器的位置，然后对应的解析出来

   1. 作为请求链接的参数（query）

   2. 作为主体的参数（body）

   3. 作为请求头的参数（Header）（使用x-access-token）

      ```
      var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.header['authorization']
      ```

4. `express-jwt`这个插件验证的token是否有效，默认会自动去请求头的authorization这个属性里面去找token的值，放在body或者url参数里获取不到





> 本地存储1  https://yarkovaleksei.github.io/vue2-storage/en/started.html

> 本地存储2 https://github.com/pinguinjkeke/vue-local-storage

> vue文档  https://cn.vuejs.org/v2/cookbook/index.html

> node-jsonwebtoken https://github.com/auth0/node-jsonwebtoken