//浅拷贝--深拷贝

//数组的深浅拷贝, 对多维数组不适用
var arr = [2,3,4,5,[6,7,8]];
var tmp_arr1 = arr.slice(0);     //其他浏览器使用
var tmp_arr2 = arr.concat();   //webkit浏览器使用


var obj = {name: 'Lucy', age: 26, addr: [{a: '北京'}, {b: '深圳'}, {c: '上海'}]};

//对象的深浅拷贝，需要考虑值为数组等复杂的情况
var deepCopy = function(source, newObj){
	var result = newObj || {};
	//对象使用for in 会向上查询原型链中的属性
	for (var key in source){
		//console.log(source[key].constructor);
		// 过滤调原型链上得到的属性
		if(source.hasOwnProperty(key)){
			if(typeof source[key] === 'object'){
				if(source[key] instanceof Array === true){
					result[key] = deepCopy(source[key], []);
				} else {
					result[key] = deepCopy(source[key]);
				}
			} else {
				result[key] = source[key];
			}
		}
	}
	return result;
}

// 数组深拷贝，可以复制多维数组   arr1被复制的数组，arr2新数组 可传可不传
var arrDeepCopy = function(arr1){
	var arr = [];
	for (var i =0, j = arr1.length; i < j; i++){
		if(arr1[i] instanceof Array){
			arr[i] = arrDeepCopy(arr1[i]);
		} else {
			arr[i] = arr1[i];
		}
	}
	return arr;
}

var tmp_arr3 = deepCopy(obj);
console.log(tmp_arr3);
tmp_arr3.addr[0].a = "ss";
console.log(obj);
console.log(tmp_arr3);
