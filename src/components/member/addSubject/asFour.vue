<template>
  <div class="asFour" :style="{height:screenHeight+'px'}">
    <div class="top">
      <top />
    </div>
    <div class="s4" ref="s4">
      <p class="tit">给网站起个名字？</p>
      <div class="createWeb spaceBetween">
        <p>网站名称：</p>
        <a href="#">
          <input class="webName" type="text" maxlength="50" v-model.trim="fName" @input="checkfName($event)"/>
        </a>
      </div>
      <div class="err">
        <p class="spaceleft fl" v-show="err.s4.e1">
          <img :src="pic.errIcon" />&nbsp;至少输入6个字符！
        </p>
        <p class="spaceright fr" v-show="err.s4.e2">
          <img :src="pic.errIcon" />&nbsp;该网站已存在！
        </p>
      </div>
      <a href="#">
        <div
          class="selectTem spaceleft"
          @mouseenter="iconEnter"
          @mouseleave="iconLeave"
          @click="creatWeb"
          v-if="loadGif"
        >
          <p>选择模板</p>&nbsp;
          <img class='right' ref="icon1" style="width:30px; " :src="pic.goweb" />
        </div>
        <div class="selectTem" v-else>
          <Load />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
window.document.title = 'zuma-添加网站'
import $ from 'jquery'
import Reg from '../../../assets/js/Regexps'
import Load from '../../public/loading.vue'
import top from "../top";
export default {
  name: "asFour",
  props: {
    msg: String
  },
  data() {
    return {
      // 图片及图表
      pic: {
        errIcon: require('../../../assets/img/subjectWarn.png'),
        goweb: require('../../../assets/img/goMember.png'),
        Hgoweb: require('../../../assets/img/HgoMember.png'),
      },
      // 报错显示
      err:{
        s4:{
          e1:false,
          e2:false,
        },
      },
      // 要传的参数
      fName: '',//网站名称
      // 屏幕的动态变化
      screenHeight: document.documentElement.clientHeight,
      // 加载
      loadGif:true,
    };
  },

  components: {
    top,Load
  },
  mounted(){
    window.onresize = () => {
      return (() => {
          this.screenHeight = document.body.screenHeight
      })()
    }
    console.log(this.screenHeight)
  },
  watch:{
    screenHeight(val) { // 监听屏幕高度变化
      console.log(val);
      this.screenHeight = val-100;
    }
  },
  methods: {
    // 创建网站
    creatWeb(){
      if(this.fName == ''){
        this.err.s4.e1 = true;
        return
      }
      let par = {fName:this.fName,fCompanyId:this.$route.query.fCompanyId,fShopType:this.$route.query.Stype}
      this.loadGif = false;
      console.log(par)
      $.ajax({
        type: 'GET',
        data:par,
        url: this.InterfaceAddr.creWeb,
        success: data => {
          console.log(data)        
          if(data.status == 0){
            this.err.s4.e2 = false;
            this.err.s4.e1 = false;
            this.iconMove();
          }else if(data.status == 2){
            this.err.s4.e2 = true;
            this.loadGif = true;
          }else if(data.status == 1){
            this.err.s4.e1 = true;
            this.loadGif = true;
          }else {
            console.log('请求异常')
          }
        },
        error: err => {
          console.log('错误');
        }
      })  
    },
    // 
    iconEnter() {
      this.$refs.icon1.src = this.pic.Hgoweb;
    },
    iconLeave() {      
      this.$refs.icon1.src = this.pic.goweb
    },
    iconMove() {
        // 跳转到相应环境的行业模板夜
        let hf = location.href.split(".")[1].split("-")[0];
        console.log(hf)
        if(hf == "dev"){
          window.location.href = "http://jz.dev-zuma.com/moban?fShopId="+this.$route.query.fCompanyId
        }else if(hf == "pre"){
          window.location.href = "https://jz.pre-zuma.com/moban?fShopId="+this.$route.query.fCompanyId
        }else{
          window.location.href = "https://jz.zuma.com/moban?fShopId="+this.$route.query.fCompanyId
        }       
    },
    checkfName(e){ //校验网站名
      let val = e.target.value;
      this.fName = val.trim();
      if (Reg.getByteLen(val) < 6) {
        this.err.s4.e1 = true;
        return;
      } else {
        this.err.s4.e1 = false;
      }
    }, 
  }
};
</script>
<style lang='scss' scoped>
.selectTem .right{
  margin-left: 0px;
  transition: margin-left 1s ease-in-out;
}
.selectTem:hover .right{
  margin-left: 15px;
  transition: margin-left 1s ease-in-out;
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
.asFour {
  width: 100%;
  .top {
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
  }
  .s4 {
    width: 684px;
    height: 209px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    .createWeb {
      width: 500px;
      height: 100px;
      margin: 0 auto ;
      transform: translateX(-6px);
      font-size: 18px;
      .webName {
        width: 372px;
        height: 50px;
        border: none;
        text-align: center;
        border-bottom: 2px solid #cccccc;
        background: #f9f9f9;
      }
      .webName:focus {
        outline: none;
        border-bottom: 2px solid #2fb7ec;
        color: black;
      }
    }
    .err {
      width: 372px;
      height: 30px;
      margin: -20px auto 0;
      padding-left: 122px;
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
    .selectTem {
      width: 258px;
      margin: 0 auto;
      height: 50px;
      font-size: 18px;
      color: #707070;
    }
    .selectTem:hover{
      color: #3d9be9;
    }
  }
}
</style>
