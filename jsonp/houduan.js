var express = require('express');

var app = express();


app.get('/jsonp', (req,res) => {
  res.type('text/javascript');
  console.log('前端传递过来的参数', req.query)
  // res.send('jsonp请求成功')
  console.log(req.query.callback + '(' +  '"传递一个字符串给前端"' + ')')
  res.send(req.query.callback + '(' +  '"传递一个字符串给前端"' + ')')
})

app.listen(3000)