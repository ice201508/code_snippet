<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
      <button @click="ajaxLogin">登录</button>
      <button @click="getList">发送跨域get请求，设置代理跨域</button>
      <button @click="postList">发送跨域post请求，设置代理跨域</button>
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
          this.$localStorage.set('token', res.token)
        }
      })
    },
    postList(){
      this.axios.post('/goods/list').then(function(res){
        console.log('resolve: ', res)
      }).catch(function(err){
        console.log('reject: ', err)
      })
    },
    getList(){
      this.axios.get('/goods/category').then((res)=> {
        console.log('res: ', res)
      }).catch(err => {
        console.log('err: ',err)
      })
    }
  },
  components: {
    HelloWorld
  }
}
</script>
