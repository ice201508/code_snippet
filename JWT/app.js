const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const app = express();

// 定义签名, 加盐
const signSalt = 'salt';
// 生成token
const token = jwt.sign({
  name: 'zs'
}, signSalt, {
  expiresIn: 1000*5
})

// 使用中间件验证token的合法性
app.use(expressJwt({secret:signSalt}).unless({
  path: ['/login','/getAuthCode','/registry'] // 除了这些地址，其他的url地址都需要验证
}))

// 写一个全局的拦截器
app.use(function(err,req,res,next){
  console.log(err);
  //token验证失败的时候，会抛出下面的错误
  if(err.name === 'UnauthorizedError'){
    console.log(1111111111111)
    res.send({
      code:501,
      message:'token验证失败，请重新登录'
    })
  }
})

console.log(token)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

// 一般是用户输入用户名和密码验证成功之后，就将token传递给前端 
app.post('/login', (req,res)=>{
  res.send({
    code:200,
    message: 'token下发',
    token
  })
})
app.get('/goods/category', (req, res) => {
  console.log(req.header);
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
  res.send({
    code: 200,
    list: [
      {id: 1, name: '华为', prie: 3499},
      {id: 2, name: '三星', prie: 5999},
      {id: 3, name: '苹果', prie: 8999},
    ]
  })
})
app.listen(8001)