//遍历传入实例的data对象的属性，将其设置为Vue对象的访问器属性
function observe(obj, vm) {
  Object.keys(obj).forEach(function(key) {
    defineReactive(vm, key, obj[key])
  })
}
//设置为访问器属性，并在其getter和setter函数中，使用订阅发布模式。互相监听。
function defineReactive(obj, key, val) {
  //这里用到了观察者(订阅/发布)模式,它定义了一种一对多的关系，让多个观察者监听一个主题对象，这个主题对象的状态发生改变时会通知所有观察者对象，观察者对象就可以更新自己的状态。
  //实例化一个主题对象，对象中有空的观察者列表
  var dep = new Dep()
  //将data的每一个属性都设置为Vue对象的访问器属性，属性名和data中相同
  //所以每次修改Vue.data的时候，都会调用下边的get和set方法。然后会监听v-model的input事件，当改变了input的值，就相应的改变Vue.data的数据，然后触发这里的set方法
  Object.defineProperty(obj, key, {
    get: function() {
      //Dep.target指针指向watcher，增加订阅者watcher到主体对象Dep
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function(newVal) {
      if (newVal === val) {
        return
      }
      val = newVal
      //console.log(val);
      //给订阅者列表中的watchers发出通知
      dep.notify()
    }
  })
}

//主题对象Dep构造函数
function Dep() {
  this.subs = []
}
//Dep有两个方法，增加订阅者  和  发布消息
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub)
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update()
    })
  }
}
