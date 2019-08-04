<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
      <button @click="ajaxLogin">登录</button>
      <button @click="getList">发送跨域get请求，设置代理跨域</button>
      <button @click="postList">发送跨域post请求，设置代理跨域</button>
      <button @click="postForm">表单上传图片提交</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  methods:{
    ajaxLogin(){
      this.axios.post('/login',).then(res=>{
        console.log('登录: ', res)
        if(res.token){
          // this.$localStorage.set('token', res.token)
          localStorage.setItem('token', res.token);
        }
      })
    },
    getList(){
      this.axios.get('/goods/category').then((res)=> {
        console.log('res: ', res)
      }).catch(err => {
        console.log('err: ',err)
      })
    },
    postList(){
      this.axios.post('/goods/list', {
        pageIndex:2,
        pageList:10
      }).then(function(res){
        console.log('resolve: ', res)
      }).catch(function(err){
        console.log('reject: ', err)
      })
    },
    postForm(){
      let data = new FormData();
      data.append('code','1234');
      data.append('name','yyyy');
      this.axios.post('/goods/img',data)
      .then(res=>{
          console.log('res=>',res);            
      })
    }
  },
  components: {
    HelloWorld
  }
}
</script>
