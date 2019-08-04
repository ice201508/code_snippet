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

   3. 作为请求头的参数（Header）（使用authorization）

      ```
      var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.header['authorization']
      ```

4. `express-jwt`这个插件验证的token是否有效，默认会自动去请求头的authorization这个属性里面去找token的值，放在body或者url参数里获取不到

5. `provisional headers are shown`错误提示

   ```
   provisional headers are shown出现的情况有这么几种：
   
   跨域，请求被浏览器拦截
   请求被浏览器插件拦截
   服务器出错或者超时，没有真正的返回
   强缓存from disk cache或者from memory cache，此时也不会显示
   ```

6. jsonwebtoken的设置 `jwt.sign(payload, secretOrPrivateKey, [options, callback])`

   ```
   签名的几种方式
   var jwt = require('jsonwebtoken');
   // 1. 默认的HMAC SHA256 加密方式
   var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
   // 2. 设置一个回溯时间的jwt
   var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
   // 3. 换一种加密算法
   // 从一个文件里面同步读取一个私有的key
   var cert = fs.readFileSync('private.key');
   // 使用RSA SHA256算法加密
   var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});
   
   // 4. 异步签名
   jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
     console.log(token);
   });
   ```

   - 过期时间的设置方式

     ```
     // 设置一小时的token
     jwt.sign({
       exp: Math.floor(Date.now() / 1000) + (60 * 60),
       data: 'foobar'
     }, 'secret');
     
     jwt.sign({
       exp: 60*60, // 这里的单位是秒
       data: 'foobar'
     }, 'secret');
     
     jwt.sign({
       data: 'foobar'
     }, 'secret', { expiresIn: '1h' });
      //第三种形式使用时
      在expiresIn，notBefore，audience，subject，issuer没有默认值时。也可以直接在payload中用exp，nbf，aud，sub和iss分别表示，但是你不能在这两个地方同时设置。
     ```

7. jwt的数据结构 Header.Payload.Signature 一个很长的用.分隔的字符串

   ```
   Header（头部）.Payload（负载）.Signature（签名）
   
   使用jwt.verify() 解析出来的decoded 有我们的数据和iat，exp(生效时间和过期时间)
   ```

   





> 本地存储1  https://yarkovaleksei.github.io/vue2-storage/en/started.html

> 本地存储2 https://github.com/pinguinjkeke/vue-local-storage

> vue文档  https://cn.vuejs.org/v2/cookbook/index.html

> node-jsonwebtoken https://github.com/auth0/node-jsonwebtoken

> jsonwebtoken中文文档   https://segmentfault.com/a/1190000009494020

> jsonwebtoken 官方文档  https://github.com/auth0/node-jsonwebtoken

> 阮一峰jwt解释  http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html