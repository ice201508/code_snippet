//Array数组相关
var arr = [1,2,3,4,5]

arr.shift()       //返回1，arr=[2,3,4,5]     删除数组第一个元素，返回被删元素
arr.pop()        //返回5，arr=[2,3,4]   删除数组最后一个元素，并返回被删元素
arr.push(6)    //返回4，数组长度， arr=[2,3,4,6], 数组末尾添加一个元素
arr.unshift(7) //返回5，数组长度， arr=[7,2,3,4,6],数组首位添加一个元素

tmp_arr = [].slice.call(arr)   //返回一个对象的拷贝,浅拷贝
[1,2,3,4,5].splice(2,1)   //返回一个元素组成的数组， 取出需要用[0]

//Function函数相关
fn.call(obj, arg...)        //手动绑定函数的this值，函数的this值为obj，其他3种函数调用方式都是自动绑定this值
fn.apply(obj, [arg...])   //手动绑定函数的this值

/*
call/apply实现继承的概念
function f1(){
    this.add = function(){ console.log(this.a)}
}

function f2(){
    this.sub = function(){ console.log(this.b)}
}

function f3(){
    this.a = 2;
    this.b = 5;
    f1.call(this);
    f2.apply(this)
}

var obj = new f3();   //这里f3里面的this就是 obj
obj.add()
*/
