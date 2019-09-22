// 冒泡排序

var arr = [];
for (var i =0; i< 100; i++){
	arr.push(Math.floor(Math.random() * 10000));
}

var arrDeepCopy = function(arr){
	var temp = [];
	for (var i =0, l=arr.length; i< l; i++){
		if(typeof arr[i] === 'object'){
			temp[i] = arrDeepCopy(arr[i])
		} else {
			temp[i] = arr[i];
		}
	}
	return temp;
}


var m = 0;
var n = 0;

var bubbleSort = function(arr){
	if(arr && typeof arr === 'object' && arr instanceof Array === true){
		var arrLength = arr.length;
		var copyArr = arr.concat();
		var temp = null;
		var bool = true;
		if(copyArr.length <= 1){
			return copyArr;
		} else {
			for (var i =0; i < copyArr.length-1; i++) {  //外层循环表示轮数
				bool = true;
				for(var j=0; j<copyArr.length-1-i; j++){  //内存循环表示当前数字的比较次数
					if(copyArr[j] > copyArr[j+1]){
						temp = copyArr[j];
						copyArr[j] = copyArr[j+1];
						copyArr[j+1] = temp;
						bool = false;
					}
					m++;
				}

				if(bool){ //只要当前这一轮比较顺序没变，则表示顺序已定，跳出循环
					break;
				}
				n++;
			}
		}
		return copyArr;
	}
}

console.time('bubble');
console.log(bubbleSort(arr));
//bubbleSort(arr);
console.timeEnd('bubble');
console.log(m);
console.log(n);
