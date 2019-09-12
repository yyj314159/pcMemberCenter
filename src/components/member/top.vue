<template>
  <div class="top box">
      <a href="#"><img class="logo" :src="logo" alt="zuma网" @click="goH"></a>
      <div class="topright">
          <div class="port" @mouseenter="optionEnter" @mouseleave="optionLeave">
            <a class="Hport" href="/member/index" target="_blank">
              <img :src="Hpor?Hpor:imgdefalut" @load="imgAutoAdapt($event,36,36)" />
            </a>   
            <transition name="fadeOut">
              <ul class="options" v-show="popscrol" >
                <a v-for="(item,index) in mine" :key="index" :href="item.webH" @click="goMusic(index)" ><li class="box option" ><img :src="item.pic" >&nbsp;&nbsp;&nbsp;{{item.val}}</li></a>
              </ul>
            </transition>
          </div>
          <div class="name ellipsis">{{Hname}}</div>
          <div class="goMem">
            <img ref="icon" @mouseenter="iconEnter" @mouseleave="iconLeave" @click="iconMove" class='right' :src="right">
          </div>
      </div>
  </div>
</template>

<script>
import MethodsUtil from '../../assets/js/MethodsUtil';
import MusicPlayer from '../../assets/js/musicPlayer';
export default {
  name: 'top',
  props: {
    msg: String
  },
  data(){
      return{
        // 图片部分
        logo:require('../../assets/img/logo.png'),
        Hpor:undefined,
        Hname:undefined,
        imgdefalut: require('../../assets/img/user-default.png'),
        right:require('../../assets/img/goMember.png'),
        Hright:require('../../assets/img/HgoMember.png'),
        // 下拉图标展示
        mine:[
          {pic:require('../../assets/img/mySite.png'),val:'我的主体',webH:'/member_web/mySiteOwners/index'},
          {pic:require('../../assets/img/myShop.png'),val:'购物订单',webH:'/pOrder_web/productOrder/memberList'},
          {pic:require('../../assets/img/myService.png'),val:'服务订单',webH:'/sorder_web/serviceOrder/list'},
          {pic:require('../../assets/img/myMusic.png'),val:'我的歌单',webH:'#'},
          {pic:require('../../assets/img/myVidio.png'),val:'我的视频',webH:'/video_web/shopVideoWatchOrder/videolist'},
          {pic:require('../../assets/img/myProduct.png'),val:'产品售后',webH:'/memberAfterSalePC/buyerAfterSaleList'},
          {pic:require('../../assets/img/myTort.png'),val:'服务投诉',webH:'/memberServiceComplain/memberServiceHandle'},
          {pic:require('../../assets/img/myAppraise.png'),val:'我的评价',webH:'/comment/toWaitingComment'},
          {pic:require('../../assets/img/myAcount.png'),val:'账户信息',webH:'/member_web/memberCenterIndex/index'},
          {pic:require('../../assets/img/myPassword.png'),val:'修改密码',webH:'/member_web/safeSet/editPassword'},
          {pic:require('../../assets/img/myQuit.png'),val:'退出登录',webH:'/loginOut?url='+window.location.href},
        ],
        // 选项显隐
        popscrol:false,
      }
  },
  mounted(){
    $.ajax({
      type: 'GET',
      url: this.InterfaceAddr.memInfo,
      success: data => {
        if(data.status == 0){
          let res = data.data;
          this.Hname = res.user.userName;
          this.Hpor = res.user.userHead;
        }else{
          console.log('请求异常11111')
        }
      },
      error: err => {
        console.log('错误');
      }
    }) 
  },
  methods:{
    // 跳转音乐列表
    goMusic(index){
      if(index == 3){
        let musicPlayer = new MusicPlayer();
        musicPlayer.toMusicPlayer(null,0,0,null,3);
      }
    },
    // 图片自适应
    imgAutoAdapt(e,w,h) {
      MethodsUtil.imgAutoAdapt(e, w,h)
    },
    iconEnter(){
      this.$refs.icon.src = this.Hright;
    },
    iconLeave(){
      this.$refs.icon.src = this.right;
    },
    iconMove(){
      location.href = '/member_web/member/index';    //跳转到会员中心
    },
    // 返回首页
    goH(){
      location.href = "/#/"
    },
// 选项显隐
    optionEnter(){
      this.popscrol = true;
    },
    optionLeave(){
      this.popscrol = false;
    },
  }
}
</script>
<style lang='scss' scoped>
.goMem{
  width: 23px;
  height: 23px;
}
.goMem .right{
  margin-left: 0px;
  transition: margin-left 1s ease-in-out;
}
.goMem:hover .right{
  margin-left: 15px;
  transition: margin-left 1s ease-in-out;
}
.top{
  width: 100%;
  height: 100px;
  display: flex;
  z-index: 2;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  .logo{
    width: 111px;
    height: auto;
  }
  .topright{
    width: 192px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .port{
      position: relative;
        width: 36px;
        height: 36px;
      .Hport{
        width: 36px;
        height: 36px;
        display: block;
        overflow: hidden;
        border-radius: 50%;
      }
      .options{
      position: absolute;
      z-index: 50;
      background: #f9f9f9;
      width: 192px;
      height: 450px;
      padding: 5px 0;
      overflow: hidden;
      left: -12px;
      top: 36px;
      .option{
        width: 180px;
        height: 40px;
        padding: 0 20px;
        font-size: 13px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img{width: 16px; height: auto;}
      }
      .option:hover{
        background: #ECF5FD;
      }
    }
    }
    .name{
      width: 90px;
      height: 20px;
      line-height: 20px;
    }
    .right{
      width: 23px;
      height: auto;
    }

  }
}

</style>
