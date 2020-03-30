//快速排序
var arr = [];
for (var i =1; i< 1000000; i++){
	arr.push(Math.floor(Math.random() * 1000000));
}

var quickSort = function(arr){
	if(arr && typeof arr === 'object' && arr instanceof Array === true) {
		if(arr.length <= 1){
			return arr;
		} else {
			var Index = Math.floor(arr.length/2);   //这里不能用length替代
			var indexNum = arr.splice(Index, 1)[0];  //这里不能用slice,要将中间的那个数从数组里面删除

			var left = [];
			var right = [];
			var length = arr.length;
			for (var i =0; i< length; i++){
				if(arr[i]< indexNum){
					left.push(arr[i]);
				} else {
					right.push(arr[i]);
				}
			}

			//快排的关键 --- 递归
			return quickSort(left).concat([indexNum], quickSort(right));
			//return Array.prototype.push.apply(quickSort(left), [indexNum],quickSort(right));
		}
	} else {
		return arr;
	}
}

console.time('quickSort');
quickSort(arr);
console.timeEnd('quickSort');
