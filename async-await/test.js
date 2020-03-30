//  1. async有什么用？

async function myAsync(){
  return {name: 123}
}
const result1 = myAsync();
// async函数会返回一个Promise对象；如果这个函数内部返回一个值,async会将这个直接量通过Promise.resolve() 封装成Promise对象，如果函数不返回值，则返回的是Promise.resolve(undefined)
console.log('result1=>', result1);

// 1.2 既然返回的是一个promise对象，就不能直接赋值，应该使用.then， .catch等链式写法获取返回的值
myAsync().then(res=>{
  console.log('res这是通过链式编程得到的值=>', res)
})

// 2.await有什么作用？
//await可以等待一个async函数的返回值，这也可以说是await在等待async函数，但一定注意，本质上是等待返回值；
//await不仅仅可以等Promise对象，可以等任意表达式的结果；所以await后面是可以接普通函数调用，或者直接量的

function getName(){
  return 'Jack';
}
async function myAsync2(){
  return Promise.resolve('这是一个promise对象')
}

async function test(){
  const v1 = await getName();
  const v2 = await myAsync2();
  console.log(v1);
  console.log(v2);
}
test();





function takeLongTime(n){
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(n+200)
    },n)
  })
}
// 模拟做一个事件的几个步骤
function step1(n){
  console.log(`step1=> ${n}`);
  return takeLongTime(n)
}
function step2(n){
  console.log(`step2=> ${n}`);
  return takeLongTime(n)
}
function step3(n){
  console.log(`step3=> ${n}`);
  return takeLongTime(n)
}

// 使用Promise实现
function doWithPromise(){
  console.time("doWithPromise");
  const time1 = 300;
  step1(time1)
    .then(time2=>step1(time2))
    .then(time3=>step3(time3))
    .then(result=>{
      console.log(`finnal result is=>${result}`)
      console.timeEnd("doWithPromise")
    })
}

doWithPromise()

// 使用async/await 来实现
async function doWithAsync(){
  console.time("doWithAsync");
  const time1 = 300;
  const time2 = await step1(time1);
  const time3 = await step2(time2);
  const result = await step3(time3);
  console.log(`finnal result is=>${result}`)
  console.timeEnd("doWithAsync")
}
doWithAsync();

// Promise方案最大的不好用之处就是 参数的传递太麻烦
