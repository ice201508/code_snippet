const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// 定义签名, 加盐
const signSalt = 'salt';
var token = null;
// // 生成token
// var token = jwt.sign({
//   name: 'zs'
// }, signSalt, {
//   expiresIn: 1000*5
// })

// app.all('*',(req,res)=>{
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   // res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
//   res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, Content-Language, Cache-Control, X-E4M-With,X_FILENAME");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// })

// 使用中间件验证token的合法性, 也可以不适用expressJWT插件，用jwt自带的方法也可以判断
// app.use(expressJwt({secret:signSalt}).unless({
//   path: ['/login','/getAuthCode','/registry'] // 除了这些地址，其他的url地址都需要验证
// }))

app.use((req,res,next)=>{  
  // res.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  if(req.url != '/login'){
    if(token){
      jwt.verify(token,signSalt,(err,decoded)=>{
        if(err){
          console.log('err1=>',err)
          res.send({
            code:501,
            message: 'token验证失败，请重新登录11'
          })
        }else {
          console.log('decoded=>',decoded)
          next();
        }
      })
    }else {
      res.send({
        code:502,
        message: '请先登录'
      })
    }
  }else {
    next()
  }
})

// 写一个全局的拦截器
app.use(function(err,req,res,next){
  console.log(2,res.body);
  console.log(3,err);
  //token验证失败的时候，会抛出下面的错误
  if(err.name === 'UnauthorizedError'){
    res.send({
      code:501,
      message:'token验证失败，请重新登录'
    })
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

// 一般是用户输入用户名和密码验证成功之后，就将token传递给前端 
app.post('/login', (req,res)=>{
  // 生成token, 同步和异步， 2个参数和3个参数
  // 使用两个参数也可以
  // var token = jwt.sign({data:'123', exp:10}, signSalt)
  jwt.sign({
    user: {id:1, name:'ME!', role: 'average'}
  }, signSalt, {
    expiresIn: 60
  },function(err, token11){
    console.log("token11: ", token11)
    token = token11;
    res.send({
      code:200,
      message: 'token下发',
      token: token11
    })
  })
  
})
app.get('/goods/category', (req, res) => {
  res.send({
    status: 200,
    data: [
      {id:1, name: '手机',icon:'abc'},
      {id:2, name: '电脑',icon:'def'},
      {id:3, name: '相机',icon:'hij'},
    ]
  })
})
app.post('/goods/list', (req,res) =>  {
  console.log(1,req.get("Authorization"));
  console.log('res.body=>',req.body);
  res.send({
    code: 200,
    list: [
      {id: 1, name: '华为', prie: 3499},
      {id: 2, name: '三星', prie: 5999},
      {id: 3, name: '苹果', prie: 8999},
    ]
  })
})
app.post('/goods/img', (req,res) => {
  res.send({
    code:200,
    message: '图片上传成功'
  })
})
app.listen(8001)