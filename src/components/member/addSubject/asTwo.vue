<template>
  <div class="asTwo" :style="{height:screenHeight+'px'}">
    <div class="top">
      <top />
    </div>
    <div class="s2" ref="s2">
      <p class="tit">是为哪个主体创建网站？</p>
      <p class="err" v-show="err.s2">{{err.text}}</p>
      <div class="subjectName box" >
        <a href="#" class="oneName spaceCenter fl" v-for="(item, index) in subLists" :key="index" @click="iconMove(index)">
          <span class="name ellipsis">{{item.fName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="mov" v-show="item.sh">></span>
        </a>
        <a href="#" class="oneName spaceCenter fl" @click="iconMove('addPop')">
          <img :src="pic.addSub" style="width:30px;">&nbsp;
          <span class="name ellipsis">添加</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="mov">></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
window.document.title = 'zuma-主体列表'
//import Util from '../../assets/js/MethodsUtil'
import top from "../top";
import { log } from 'util';
export default {
  name: "asTwo",
  props: {
    msg: String
  },
  data() {
    return {
      // 主体列表数据
      subLists:[],
      // 屏幕的动态变化
      screenHeight: document.documentElement.clientHeight,
      // 图片及图表
      pic: {
        errIcon: require('../../../assets/img/subjectWarn.png'),
        goweb: require('../../../assets/img/goMember.png'),
        Hgoweb: require('../../../assets/img/HgoMember.png'),
        addSub:require('../../../assets/img/addSubject.png')
      },
      // 报错显示
      err:{
        s2:false,
        text:'',
      },
      // 要传的参数
      fName: '',//网站名称
      fCompanyId:'',//主体ID
      // 
    };
  },

  components: {
    top
  },
  mounted() {
    window.onresize = () => {
      return (() => {
          this.screenHeight = document.body.screenHeight
      })()
    }
    // 获取主体
    let par = {siteType:this.$route.query.Stype};
      $.ajax({
        type: 'GET',
        data:par,
        url: this.InterfaceAddr.selSubType,
        success: data => {
          if(data.status == 0){
            let res = data.data
            console.log(res)
            for(let i = 0;i<res.length;i++){
              let obj = {
                fName:res[i].fName,
                sh:true,
                fId:res[i].fId,
              }
              this.subLists.push(obj);
            }
          }else{
            console.log('请求异常')
          }
        },
        error: err => {
          console.log('错误');
        }
      })  
  },
  methods: {
    // 选择主体
    seleSubject(fId,num){
      let data = {fId:fId}
      $.ajax({
        type: 'GET',
        data:data,
        url: this.InterfaceAddr.selSub,
        success: data => {
          console.log(data)
          if(data.status == 0){
            this.err.s2 = false;
            this.err.text = ''
            // 跳转
            this.$router.push({path: '/pcMemberCenter/asFour',query: { fCompanyId: fId,Stype: this.$route.query.Stype}}); 
          }else if(data.status == 2){
            this.err.s2 = true;
            this.err.text = '您的账户已被处理，无法添加！'
          }else if(data.status == 3){
            this.err.s2 = true;
            this.err.text = '该主体已被冻结，禁止添加网站！'
          }else if(data.status == 4){
            this.err.s2 = true;
            this.err.text = '该主体不存在！'
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
      }    
    },
    iconLeave(num) {
      switch(num){
        case 0:this.$refs.icon.src = this.pic.goweb;break;
        case 1:this.$refs.icon1.src = this.pic.goweb;break;
      }
    },
    iconMove(num) {
      if(num == 'addPop'){
        this.$router.push({path: '/pcMemberCenter/asThree',query: { Stype: this.$route.query.Stype}});
      }else{
        this.subLists[num].sh = true;
        this.seleSubject(this.subLists[num].fId,num)
      }    
    }
  }
};
</script>
<style lang='scss' scoped>
.oneName .mov{
  margin-left: 0px;
  transition: margin-left 1s ease-in-out;
}
.oneName:hover .mov{
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
.asTwo {
  width: 100%;
  .top {
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
  }

  .s2 {
    width: 684px;
    height: 250px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    .err {
      width: 600px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      color: #db0000;
      margin: 10px auto 50px;
    }
    .subjectName {
      width: 700px;
      height: 60px;
      margin: 50px auto 0;
      .oneName {
        width: 50%;
        font-weight: 400;
        margin: 0 auto;
        line-height: 50px;
        font-size: 22px;
        span {
          display: block;
        }
        .name {
          max-width: 86%;
        }
      }
      .oneName:hover {
        color: #3d9be9;
      }
    }
  }

}
</style>
