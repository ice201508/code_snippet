var arr = [7, 6, 5, 4, 3, 2]

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  var middleIndex = Math.floor(arr.length / 2)
  var middleItem = arr.splice(middleIndex, 1)[0]
  var left = []
  var right = []

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > middleItem) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }

  return [...quickSort(left), middleItem, ...quickSort(right)]
}

console.log(quickSort(arr))
