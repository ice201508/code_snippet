function Public() {
  //存放订阅者信息
  this.subscribers = []
  //添加订阅者
  this.addSubscriber = function(subscriber) {
    //保证一个订阅者只能订阅一次
    let isExist = this.subscribers.some(function(item) {
      return item == subscriber
    })

    if (!isExist) {
      this.subscribers.push(subscriber)
    }
    return this
  }

  //发布消息
  this.deliver = function(data) {
    this.subscribers.forEach(function(fn) {
      fn(data)
    })
    return this
  }
}

//订阅者
let a = function(data) {
  console.log(`订阅者a收到订阅信息：${data}`)
}
let b = function(data) {
  console.log(`订阅者b收到订阅信息：${data}`)
}
let c = function(data) {
  console.log(`订阅者c收到订阅信息：${data}`)
}

//初始化
let publisher = new Public()

//添加订阅者
publisher.addSubscriber(a)
publisher.addSubscriber(b).addSubscriber(c)

//公众号发布消息
publisher.deliver('这是公众号推送的第1条新信息！')
publisher
  .deliver('这是公众号推送的第2条新信息！')
  .deliver('这是公众号推送的第3条新信息！')
