### JSONP的自己实现

1. 在前端定义一个函数，接收一个回调函数，url，以及一个参数
2. 这个函数的内容是创建一个scirpt标签，并且根据传递过来的参数，童泰拼接src属性，通过src不受同源策略的影响这个特性，通过apendChild添加到浏览器里面，自动向服务器发出一个get请求
3. 服务器接收到这个请求以后，返回一个回到函数，调用函数的字符串形式， 类似callback('传递的参数')
4. 前端接收到服务器的返回之后，会将这个字符串解析为一个函数的调用，所以我们在前的函数里面要定义一个函数，和这个回调函数的名字一模一样，然后就可以接受到服务器传递回来的值