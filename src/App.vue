<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  created(){
    // 登录拦截（掉接口）
    $.ajax({
        url:this.InterfaceAddr.getLoginStatus,
        async:false,
        success:(res)=>{
            if(res.status === 0){
              if(!res.data){
                  window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
              }
            }
        }
    });   
  }
}
</script>

<style>
@import url('assets/css/public.css');
</style>
