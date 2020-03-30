//订阅(监听程序，类似ele.on('build', callback)) ，发布(触发事件ele.dispatchEvent(event),或者鼠标点击)
//https://segmentfault.com/a/1190000004315216,

var Event = (function(){
    var event = {
        clientList: [],
        //订阅事件
        listen: function(key, fn){
            if(!this.clientList[key]){
                this.clientList[key] = [];
            }
            this.clientList[key].push(fn);
            console.log(this.clientList);
        },
        trigger: function(){
            var key = [].shift.call(arguments);   //获取数组内第一个元素， 类似队列，先进先出
            var fns = this.clientList[key];

            if(!fns || fns.length ===0){
                return false;
            }

            for(var i =0, fn; fn=fns[i++];){
                fn.apply(this, arguments)
            }
        }
    }

    return function(){
        return Object.create(event);
    }
})();

var eventModel = Event();
eventModel.listen('self', function(){console.log('333');})
eventModel.trigger('self');
