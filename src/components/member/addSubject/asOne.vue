<template>
  <div class="asOne" :style="{height:screenHeight+'px'}">
    <div class="top">
      <top />
    </div>
    <div class="s1" ref="s1" >
      <p class="tit">请选择创建网站的主体类型：</p>
      <div class="subjectType spaceleft">
        <a href="#" class="oneType" @click.stop="iconMove(1)">
          <span>公司企业</span>&nbsp;
          <span class="mov">></span>
        </a>
        <a href="#" class="oneType" @click.stop="iconMove(2)">
          <span>党政机关</span>&nbsp;
          <span class="mov">></span>
        </a>
        <a href="#" class="oneType" @click.stop="iconMove(3)">
          <span>事业单位</span>&nbsp;
          <span class="mov">></span>
        </a>
        <a href="#" class="oneType" @click.stop="iconMove(4)">
          <span>社会团体</span>&nbsp;
          <span class="mov">></span>
        </a>
      </div>
      <div class="subjectType spaceleft" style="margin-top:10px;">
        <a href="#" class="oneType" @click="iconMove(5)">
          <span>民办非企业单位</span>&nbsp;
          <span class="mov">></span>
        </a>
        <a href="#" class="oneType" @click="iconMove(6)">
          <span>基金会</span>&nbsp;
          <span class="mov">></span>
        </a>
        <a href="#" class="oneType" @click="iconMove(7)">
          <span>个人</span>&nbsp;
          <span class="mov">></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
window.document.title = 'zuma-选择类型'
import $ from 'jquery'
import top from "../top";
export default {
  name: "asOne",
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
      // 屏幕的动态变化
      screenHeight: document.documentElement.clientHeight-100,
    };
  },
  mounted(){
    console.log(this.screenHeight);
    window.onresize = () => {
    return (() => {
        this.screenHeight = document.body.screenHeight
    })()
}
  },
  components: {
    top
  },
  watch:{
    screenHeight(val) { // 监听屏幕高度变化
      console.log(val);
      this.screenHeight = val-100;
    }
  },
  methods: {
    // step1查询并跳转页面
    hasSubject(type){
      let data = {siteType:type};
      $.ajax({
        type: 'GET',
        data:data,
        url: this.InterfaceAddr.selSubType,
        success: data => {
          if(data.status == 0){
            console.log(data)
            this.$router.push({path: '/pcMemberCenter/asTwo',query: { Stype: type}});
          }else if(data.status == 2){
            this.$router.push({path: '/pcMemberCenter/asThree',query: { Stype: type}});
          }else if(data.status == 3){
            this.$router.push({path: '/pcMemberCenter/asFour',query: { Stype: type}});
          }else{
            console.log('请求异常')
          }
        },
        error: err => {
          console.log('错误');
        }
      })      
    },
    iconMove(num) {
      switch (num) {
        case 1:this.hasSubject('COMPANY');break;
        case 2:this.hasSubject('PARTY_AND_GOVERNMENT');break;
        case 3:this.hasSubject('INSTITUTION');break;
        case 4:this.hasSubject('SOCIO_GROUP');break;
        case 5:this.hasSubject('PEOPLE_RUN_UNITS');break;
        case 6:this.hasSubject('FOUNDATION');break;
        case 7:this.hasSubject('PERSONAL');break;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.oneType .mov{
  margin-left: 0px;
  transition: margin-left 1s ease-in-out;
}
.oneType:hover .mov{
  margin-left: 15px;
  transition: margin-left s ease-in-out;
}
.asOne {
  width: 100%;
  position: relative;
  .top {
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
  }
  .s1 {
    width: 684px;
    height: 209px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    .tit {
      width: 700px;
      height: 50px;
      font-size: 40px;
      font-weight: 400;
      text-align: center;
      line-height: 50px;
    }   
    .subjectType {
      width: 800px;
      height: 60px;
      margin-top: 40px;
      .oneType {
        width: 25%;
        span {
          display: inline-block;
        }
      }
      .oneType:hover {
        color: #3d9be9;
      }
    }
  }
}
</style>
