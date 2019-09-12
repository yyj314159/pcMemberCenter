<template>
  <div class="asThree" :style="{height:screenHeight+'px'}">
    <div class="top">
      <top />
    </div>
    <div class="s3" ref="s3">
      <p class="tit">创建{{tit.s3}}类型主体？</p>
      <div class="createPro spaceBetween">
        <p>主体名称：</p>
        <input class="ztName" type="text" maxlength="50" v-model.trim="fName" @input="checkfName($event)"/>
        <div class="goMem">
          <img
            class="right"
            ref="icon"
            style="width:36px; "
            @mouseenter="iconEnter(0)"
            @mouseleave="iconLeave(0)"
            @click="creatSubject()"
            :src="pic.goweb"
          />
        </div>
      </div>
      <div class="err">
        <p class="spaceleft fl" v-show="err.s3.e1">
          <img :src="pic.errIcon" />&nbsp;至少输入6个字符！
        </p>
      </div>
      <p class="spaceright rep" v-show="err.s3.e2">
          <img :src="pic.errIcon" />&nbsp;该主体名称已存在，建议申请加入该主体成为管理员，实现资源共享！
      </p>
      <div class="spaceLeft repL" v-show="conn">
          <img :src="pic.suc" />&nbsp;提交申请成功！请耐心等待主体受理<br><br>
          <div class="conn">所有者联系方式：<span class="pho">{{pho.val}}</span></div>
      </div>
      <div class="special" v-show="special">
        <a href="#">
        <div class="joinL" v-for="(item,index) in proData" :key="index" @click="applyJoin(item.fRandomCode)">
          {{item.fName}}(所有者:{{item.userName}})&nbsp;&nbsp;&nbsp;&nbsp;申请加入&nbsp;&nbsp;
            <img class="joinR" style="width:18px;" :src="pic.goweb"/>
        </div>
        </a>
        <a href="#">
        <div v-if='loadGif' v-show="goon" class="join" @mouseenter="iconEnter(2)"
              @mouseleave="iconLeave(2)"
              @click="goOnCre">  
          <p class="apJoin">继续创建</p>&nbsp;&nbsp;
            <img
              class="joinR"
              ref="icon2"
              style="width:36px; "
              :src="pic.goweb"
            />
        </div>
        <div v-show="goon" class="join" v-else>
          <Load />
        </div>        
        </a>
        <p class="spaceright rep" v-show="pho.errV">
          <img :src="pic.errIcon" />&nbsp;{{pho.err}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
window.document.title = 'zuma-创建主体'
import $ from 'jquery'
import Reg from '../../../assets/js/Regexps'
import top from "../top";
import Load from '../../public/loading.vue'
export default {
  name: "asThree",
  props: {
    msg: String
  },
  data() {
    return {
      tit: {
        s3: "",
      },
      // 图片及图表
      pic: {
        errIcon: require('../../../assets/img/subjectWarn.png'),
        goweb: require('../../../assets/img/goMember.png'),
        Hgoweb: require('../../../assets/img/HgoMember.png'),
      },
      // 报错显示
      err:{
        s3:{
          e1:false,
          e2:false,
        },
      },
      // 屏幕的动态变化
      screenHeight: document.documentElement.clientHeight,
      // 重复信息是否显示
      special:false,
      goon:true,
      conn:false,
      // 要传的参数
      fName: '',//主体名称
      proData:'',//重复主体
      // 联系电话
      pho:{val:'',err:'',errV:false},
      // 加载显示
      loadGif:true,
    };
  },
  components: {
    top,Load
  },
  mounted() {
    window.onresize = () => {
      return (() => {
          this.screenHeight = document.body.screenHeight
      })()
    }
    // 判断主体类型
    switch(this.$route.query.Stype){
      case'COMPANY':this.tit.s3 = '公司/企业'; break;
      case'PARTY_AND_GOVERNMENT':this.tit.s3 = '党政机关'; break;
      case'INSTITUTION':this.tit.s3 = '事业单位'; break;
      case'PEOPLE_RUN_UNITS':this.tit.s3 = '民办非企业单位'; break;
      case'FOUNDATION':this.tit.s3 = '基金会'; break;
      case'SOCIO_GROUP':this.tit.s3 = '社会团体'; break;
      case'PERSONAL':this.tit.s3 = '个人'; break;
    }
  },
  methods: {
    // 创建主体
    creatSubject(){
      if(this.fName == ''){
        this.err.s3.e1 = true;
        return
      }
      let data = {fName:this.fName,siteType:this.$route.query.Stype,type:0}
      $.ajax({
        type: 'GET',
        data:data,
        url: this.InterfaceAddr.creaSub,
        success: data => {
          if(data.status == 0){
            this.err.s3.e2 = false;
            this.err.s3.e1 = false;
            this.iconMove() 
          }else if(data.status == 2){
            this.special = true;
            this.err.s3.e2 = true;
            this.proData = data.data;
          }else{
            console.log('请求异常')
          }
        },
        error: err => {
          console.log('错误');
        }
      })  
    },
    // 
    iconEnter(num) {
      switch(num){
        case 0:this.$refs.icon.src = this.pic.Hgoweb;break;
        case 1:this.$refs.icon1.src = this.pic.Hgoweb;break;
        case 2:this.$refs.icon2.src = this.pic.Hgoweb;break;
      }    
    },
    iconLeave(num) {
      switch(num){
        case 0:this.$refs.icon.src = this.pic.goweb;break;
        case 1:this.$refs.icon1.src = this.pic.goweb;break;
        case 2:this.$refs.icon2.src = this.pic.goweb;break;
      }
    },
    iconMove() {
      this.$router.push({path: '/pcMemberCenter/asTwo',query:{Stype:this.$route.query.Stype}});
    },
    checkfName(e){ //校验主题名
      let val = e.target.value;
      this.fName = val.trim();
      if (Reg.getByteLen(val) < 6) {
        this.err.s3.e1 = true;
        return;
      } else {
        this.err.s3.e1 = false;
      }
    }, 
    // 继续创建
    goOnCre(){
      if(this.fName == ''){
        this.err.s3.e1 = true;
        return
      }
      let data = {fName:this.fName,siteType:this.$route.query.Stype,type:1}
      this.loadGif = false
      $.ajax({
        type: 'GET',
        data:data,
        url: this.InterfaceAddr.creaSub,
        success: data => {
          console.log(data)
          if(data.status == 0){
            this.err.s3.e2 = false;
            this.err.s3.e1 = false;
            this.iconMove()
          }else{
            console.log('请求异常')
          }
        },
        error: err => {
          console.log('错误');
        }
      })  
    },
    // 申请加入
    applyJoin(code){
      let data = {code:code}
      console.log(data)
      $.ajax({
        type: 'GET',
        data:data,
        url: this.InterfaceAddr.applyJoin,
        success: data => {
          console.log(data)
          if(data.status == 0){
            this.conn = true;
            this.special = false;
            this.err.s3.e2 = false;
            this.pho.errV= false;
            this.pho.val = data.data.fUserPhone
          }else if(data.status == 3){
            this.pho.err = '该店铺不存在！';
            this.pho.errV= true;            
          }else if(data.status == 4){
            this.pho.err = ' 该主体已拒绝您的再次申请！';
            this.pho.errV= true;
          }else if(data.status == 5){
            this.pho.err = '已发送，请等待！(之前已经发送过)！';
            this.pho.errV= true;
          }else if(data.status == 6){
            this.pho.err = '不允许向自己的主体发送！';
            this.pho.errV= true;
          }else if(data.status == 9){
            this.pho.err = '您当前已经是该主体用户，不得重复添加！';
            this.pho.errV= true;
          }else {
            console.log('请求异常')
          }
        },
        error: err => {
          console.log('错误');
        }
      }) 
    },
  }
};
</script>
<style lang='scss' scoped>
.join:hover .joinR{
  margin-left: 15px;
  transition: margin-left 1s ease-in-out;
  content:url('../../../assets/img/HgoMember.png')
}
.goMem{
  width: 36px;
  height: 36px;
}
.goMem .right{
  margin-left: 0px;
  transition: margin-left 1s ease-in-out;
}
.join .joinR{
  margin-left: 0px;
  transition: margin-left 1s ease-in-out;
}
.joinL .joinR{
  margin-left: 0px;
  transition: margin-left 1s ease-in-out;
}
.goMem:hover .right{
  margin-left: 15px;
  transition: margin-left 1s ease-in-out;
}
.join:hover .joinR{
  margin-left: 15px;
  transition: margin-left 1s ease-in-out;
  content:url('../../../assets/img/HgoMember.png')
}
.joinL:hover .joinR{
  margin-left: 15px;
  transition: margin-left 1s ease-in-out;
  content:url('../../../assets/img/HgoMember.png')
}
.tit {
  width: 700px;
  height: 60px;
  font-size: 40px;
  font-weight: 400;
  text-align: center;
  line-height: 60px;
  margin: 0 auto;
}
.asThree {
  width: 100%;
  position: relative;
  .top {
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
  }
  .s3 {
    width: 684px;
    height: 250px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    .createPro {
      width: 560px;
      height: 100px;
      margin: 80px auto 0;
      transform: translateX(-6px);
      font-size: 18px;
      .ztName {
        width: 372px;
        height: 50px;
        text-align: center;
        border: none;
        border-bottom: 2px solid #cccccc;
        background: #f9f9f9;
      }
      .ztName:focus {
        outline: none;
        border-bottom: 2px solid #2fb7ec;
        color: black;
      }
    }
    .err {
      width: 372px;
      height: 30px;
      margin: -20px auto 0;
      padding-left: 70px;
      color: #db0000;
      p {
        width: 50%;
        height: 16px;
        line-height: 16px;
      }
      img {
        width: 16px;
        height: 16px;
        display: inline-block;
      }
    }
    .rep{
      width: 520px;
      height: 50px;
      color: #db0000;
      margin: 0 auto;
      text-align: center;
      line-height: 50px;
      img{
        width: 16px;
        height: auto;
      }
    }
    .repL{
      width: 520px;
      height: 60px;
      margin: 0 auto;
      text-align: center;
      img{
        width: 16px;
        height: auto;
      }
      .conn{
        .pho{
          font-size: 22px;
          font-weight: 400;
          color: #2FB7EC;
        }
      }
    }
    .special{
      width: 520px;
      height: 100px;
      margin: 20px auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .joinL{
        width: 520px;
        height: 30px;
        display: flex;
        align-items: center;
      }
      .join{
        width: 520px;
        height: 50px;
        display: flex;
        align-items: center;
        .apJoin{
          display: inline;
          font-size: 22px;
        }
      }
      .join:hover{
        color: #2FB7EC;
      }
      .joinL:hover{
        color: #2FB7EC;
      }
    }
  }

}
</style>
