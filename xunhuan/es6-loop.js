var arr = [7, 6, 5, 4, 3, 2]

arr.forEach(item => {
  // console.log(item)
})
var map1 = arr.map(item => {
  return item * 2
})
console.log('map1=>', map1)
var filter2 = arr.filter(item => {
  return item % 2 === 0
})
console.log('filter2=> ', filter2)
var every = arr.every(item => {
  console.log('every=>', every)
  return item > 4
})
console.log('every result=>', every)

var some = arr.some(item => {
  console.log('some=>', item)
  return item > 2
})
console.log(some)
