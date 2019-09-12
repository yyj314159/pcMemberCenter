<template>
  <div class="identSubject box">
    <div class="top">
      <top />
    </div>
    <top />
      <p class="tit">主体信息认证</p>
        <div class="status spaceAround" v-show="success">
          <img class="left" :src="pic.identSuccess" >
          <div class="right">
            <p>{{par.fName}}主体已通过认证</p>
            <p>归属于该主体的网站可以享有更多高质量的服务。</p>
          </div>          
        </div>
        <div class="status spaceAround" v-show="inP">
          <img class="left" :src="pic.identIn" >
          <div class="right">
            <p>{{par.fName}}主体认证中</p>
            <p>请耐心等候！</p>
          </div>          
        </div> 
        <div class="status spaceAround" v-show="fail">
          <img class="left" :src="pic.deleteCertificate" >
          <div class="right">
            <p>{{par.fName}}主体认证被驳回&nbsp; &nbsp;<a href="#" class="reIden" @click="reIden">重新认证</a></p>
            <p>驳回原因：{{RejectReason}}</p>
          </div>          
        </div>               
      <ul class="addOptions">
        <li><span class="optit">主体名称：</span>{{par.fName}}</li>
        <li><city-picker :isShow="AddrShow" class="selAddr" @getAddress = "getAddress"/><span class="optit"><span style="color:#db0000;">*</span>所属地区：</span> <input class="inp inp1" type="text" :value="par.fAddressDistrict" readonly="true" @click="showAddr"/></li>
        <li><span class="optit"><span style="color:#db0000;">*</span>详细地址：</span><input :readonly="typeShow.isReadOnly" class="inp inp2" type="text" :value="par.fAddressTown" axlength="50" @input="checkDetAddr($event)">&nbsp;&nbsp;<span v-show="err.detAddrErr" class="spaceleft errCot"><img :src="pic.subjectWarn">&nbsp;至少输入6个字符！</span></li>
        <li><span class="optit"><span style="color:#db0000;">*</span>邮编：</span><input class="inp" type="text" :value="par.fPostalCode" readonly></li>
        <li><span class="optit"><span style="color:#db0000;">*</span>联系人：</span><input :readonly="typeShow.isReadOnly" class="inp inp3" type="text" :value="par.fBusinessName" maxlength="40" @input="checkPerson($event)">&nbsp;&nbsp;<span v-show="err.personErr" class="spaceleft errCot"><img :src="pic.subjectWarn">&nbsp;请输入联系人！</span></li>
        <li><span class="optit"><span style="color:#db0000;">*</span>固定电话：</span><input :readonly="typeShow.isReadOnly" class="inp inp4" type="text" :value="par.fPhoneNum" maxlength="30" @input="checkPhone($event)">&nbsp;&nbsp;<span v-show="err.phoneErr" class="spaceleft errCot"><img :src="pic.subjectWarn">&nbsp;请输入固定电话！</span></li>
        <li v-show="typeShow.sCredit"><span class="optit"><span style="color:#db0000;">*</span>统一社会信用代码：</span><input :readonly="typeShow.isReadOnly" :value="par.fBusinessNumber" class="inp inp5" maxlength="30" type="text" @input="checkCredit($event)">&nbsp;&nbsp;<span v-show="err.creditErr" class="spaceleft errCot"><img :src="pic.subjectWarn">&nbsp;请输入社会信用代码！</span></li>
        <li v-show="typeShow.sCurrency"><span class="optit"><span style="color:#db0000;">*</span>注册资金（元）：</span><input :readonly="typeShow.isReadOnly" :value="par.fCapital" class="inp inp6" type="text" @input="checkFunds($event)">&nbsp;&nbsp;<span v-show="err.fundsErr" class="spaceleft errCot"><img :src="pic.subjectWarn">&nbsp;请输入注册资金！</span></li>
        <li v-show="typeShow.sBusiness"><span class="optit fl"><span style="color:#db0000;">*</span>{{typeShow.BusinessName}}：</span>
          <el-button type="primary">上传文件</el-button>&nbsp;&nbsp;&nbsp;&nbsp;<span v-show="err.oth" class="spaceleft errCot"><img :src="pic.subjectWarn">&nbsp;{{err.othN}}</span>
          <input type="file" accept="image/*" class="uplod" title=" " v-show="!typeShow.isReadOnly == true" @change="uploadFile($event,0)" style="width:98px; height:40px; overflow:hidden;"/>
          <div class="certificate" v-show="certi.oth1">
            <p class="cerName">{{certi.othName1}}</p>
            <div class="cerPic spaceBetween">
              <p class="cerPicOne"></p><img class="cerPicTwo" :src="pic.deleteCertificate" @click="delcert('oth1',certi.othName1)">
            </div>
          </div>
          <div class="certificate" v-show="certi.oth2">
            <p class="cerName">{{certi.othName2}}</p>
            <div class="cerPic spaceBetween">
              <p class="cerPicOne"></p><img class="cerPicTwo" :src="pic.deleteCertificate" @click="delcert('oth2',certi.othName2)">
            </div>
          </div>
        </li>
        <li style="overflow:hidden" ><span class="optit fl"><span style="color:#db0000;">*</span>授权委托书：</span>
          <el-button type="primary">上传文件</el-button>&nbsp;&nbsp;&nbsp;&nbsp;<span v-show="err.pow" class="spaceleft errCot"><img :src="pic.subjectWarn">&nbsp;{{err.powN}}</span>
          <a :href="Dp" class="downPow">请下载《授权委托书》，由企业法人签字并加盖企业公章并上传！</a>
          <input type="file" accept="image/*" class="uplod" title=" " v-show="!typeShow.isReadOnly == true" @change="uploadFile($event,1)" style="width:98px; height:40px; overflow:hidden;" />
          <div class="certificate" v-show="certi.pow1">
            <p class="cerName">{{certi.powName1}}</p>
            <div class="cerPic spaceBetween">
              <p class="cerPicOne"></p><img class="cerPicTwo" :src="pic.deleteCertificate" @click="delcert('pow1',certi.powName1)">
            </div>
          </div>
          <div class="certificate" v-show="certi.pow2">
            <p class="cerName">{{certi.powName2}}</p>
            <div class="cerPic spaceBetween">
              <p class="cerPicOne"></p><img class="cerPicTwo" :src="pic.deleteCertificate" @click="delcert('pow2',certi.powName2)">
            </div>
          </div>
        </li>
        <li style="overflow:hidden" v-show="typeShow.sSubm">
          <a href="#" class="spaceleft hand" @mouseenter="iconEnter" @mouseleave="iconLeave" @click="iconMove" v-if='loadGif'>     
          <p ref="subm" class="subm">提交申请</p>&nbsp;
          <div class="goMem">
            <img ref="icon" class="right" style="width:30px; " :src="pic.goweb"/>
          </div> 
          </a>  
          <a href="#" class="hand" v-else>     
          <Load /> 
          </a>      
        </li>
      </ul>
  </div>
</template>

<script>
window.document.title = 'zuma-认证主体'
import MethodsUtil from '../../assets/js/MethodsUtil'
import top from './top'
import $ from 'jquery';
import cityPicker from '../public/cityPicker'
import Reg from '../../assets/js/Regexps'
import { debuglog } from 'util';
import Load from '../public/loading.vue'
export default {
  name: 'identSubject',
  components:{
    'city-picker':cityPicker,
    top,Load
  },
  data(){
      return{
        // 状态显隐
        success:false,
        inP:false,
        fail:false,
        // 选择地址显隐
        AddrShow:false,
        // 驳回原因
        RejectReason:"",
        // 授权委托书下载链接
        Dp:'',
        // 认证图片
        pic:{
          deleteCertificate:require('../../assets/img/deleteCertificate.png'),
          identIn:require('../../assets/img/identIn.png'),
          identSuccess:require('../../assets/img/identSuccess.png'),
          subjectWarn:require('../../assets/img/subjectWarn.png'),
          Hgoweb:require('../../assets/img/HgoMember.png'),
          goweb:require('../../assets/img/goMember.png'),
        },
      // 校验报错：
        err:{
          detAddrErr:false,
          personErr:false,
          phoneErr:false,
          creditErr:false,
          fundsErr:false,
          powN:'',
          pow:false,
          othN:'',
          oth:false,
        },
        // 不同类型的显隐
        typeShow:{
          sCredit:false,
          sCurrency:false,
          sBusiness:false,
          sSubm:false,   
          BusinessName:"", 
          isReadOnly:true,
        },
        // 不同证书的认证显隐
        certi:{
          pow1:false,
          pow2:false,
          powName1:'',
          powName2:'',
          powUrl1:'',
          powUrl2:'',
          oth1:false,
          oth2:false,
          othName1:'',
          othName2:'',
          othUrl1:'',
          othUrl2:'',
        },
      // 输入单的内容
        par:{
          fShopEntrepId:'',
          fShopEntrepType:'',
          fName:'',             
          fAddressDistrict:'',
          fAddressTown:'',
          fPostalCode:'',
          fBusinessName:'',
          fPhoneNum:'',
          fBusinessNumber:'',
          fCapital:'',
          fCurrency:'CNY',
          fBusinessUrl:[],
          fPowerUrl:[],
        }, 
        // 加载图
        loadGif: true,
      }   
  },
  mounted(){
  // 查看主体认证信息
      let f = decodeURI(window.location.href).split("?")[1].split("&");
      let fid = this.par.fShopEntrepId = f[0].split("=")[1];
      this.par.fShopEntrepType = f[1].split("=")[1];
      this.par.fName = f[2].split("=")[1];
      let par = {fId:fid}
      $.ajax({
        type: 'GET',
        data:par,
        url: this.InterfaceAddr.viewSub,
        success: data => {
          console.log(data)
          if(data.status == 0){
            let res = data.data;
            if(res === null){
              console.log('初次认证')
              this.typeShow.isReadOnly = false;
              this.typeShow.sSubm = true;
            }else{
              // 绑定数据
              this.par.fAddressDistrict = res.fAddressDistrict;
              this.par.fPostalCode = res.fPostalCode;
              this.par.fAddressTown = res.fAddressTown;
              this.par.fBusinessName = res.fBusinessName;
              this.par.fPhoneNum = res.fPhoneNum;
              if (res.fBusinessNumber != null)this.par.fBusinessNumber = res.fBusinessNumber;
              if (res.fCapital != null)this.par.fCapital = res.fCapital;
              if (res.fPowerUrl != null){
                this.par.fPowerUrl = JSON.parse(res.fPowerUrl);
                this.certi.pow1 = true;
                this.certi.powName1 = this.par.fPowerUrl[0].split("||")[0];
                this.certi.powUrl1 = this.par.fPowerUrl[0].split("||")[1];
                if(this.par.fPowerUrl.length==2){
                  this.certi.pow2 = true;
                  this.certi.powName2 = this.par.fPowerUrl[1].split("||")[0];
                  this.certi.powUrl2 = this.par.fPowerUrl[1].split("||")[1];
                }
              } 
              if (res.fBusinessUrl != null){
                this.typeShow.sBusiness = true;
                this.par.fBusinessUrl = JSON.parse(res.fBusinessUrl);
                this.certi.oth1 = true;
                this.certi.othName1 = this.par.fBusinessUrl[0].split("||")[0];
                this.certi.othUrl1 = this.par.fBusinessUrl[0].split("||")[1];
                if(this.par.fBusinessUrl.length==2){
                  this.certi.oth2 = true;
                  this.certi.othName2 = this.par.fBusinessUrl[1].split("||")[0];
                  this.certi.othUrl2 = this.par.fBusinessUrl[1].split("||")[1];
                }
              }
              if(res.fStatus == 'IDENTING'){
                this.inP = true;
              }else if(res.fStatus == 'INDENT_PASS'){
                this.success = true;
              }else if(res.fStatus == 'INDENT_REJECT'){
                this.fail = true;  
                this.RejectReason = res.fRejectReason;
              }
            }
          }else{
            console.log('请求异常')
          }
        },
        error: err => {
          console.log('错误');
        }
    }) 
  // 根据类型判断选项的显隐
    switch(this.par.fShopEntrepType){
      case'COMPANY':this.typeShow.BusinessName = '营业执照';this.typeShow.sBusiness=true; this.typeShow.sCredit = true;this.typeShow.sCurrency = true;this.Dp = 'https://www.zuma.com/upLoadFile/downloadFile?url=https://image.zuma.com/image/1134443246059250742.pdf&fileName=公司企业授权协议';break;
      case'PARTY_AND_GOVERNMENT':this.typeShow.BusinessName = '登记证书'; this.typeShow.sBusiness=true; this.typeShow.sCredit = true;this.Dp ='https://www.zuma.com/upLoadFile/downloadFile?url=https://image.zuma.com/image/1134453737496645407.pdf&fileName=党政机关类授权书';break;
      case'INSTITUTION':this.typeShow.BusinessName = '事业单位法人证书';this.typeShow.sBusiness=true; this.typeShow.sCredit = true; this.Dp ='https://www.zuma.com/upLoadFile/downloadFile?url=https://image.zuma.com/image/1134453749588826722.pdf&fileName=事业单位委托书';break;
      case'PEOPLE_RUN_UNITS':this.typeShow.BusinessName = '登记证书';this.typeShow.sBusiness=true; this.typeShow.sCredit = true;this.Dp ='https://www.zuma.com/upLoadFile/downloadFile?url=https://image.zuma.com/image/1134453749098093037.pdf&fileName=民办非企业单位委托书'; break;
      case'FOUNDATION':this.typeShow.BusinessName = '登记证书'; this.typeShow.sBusiness=true; this.typeShow.sCredit = true;this.Dp ='https://www.zuma.com/upLoadFile/downloadFile?url=https://image.zuma.com/image/1134453748716411282.pdf&fileName=基金会授权书';break; 
      case'SOCIO_GROUP':this.typeShow.BusinessName = '登记证书'; this.typeShow.sBusiness=true; this.typeShow.sCredit = true;this.Dp ='https://www.zuma.com/upLoadFile/downloadFile?url=https://image.zuma.com/image/1134453745755231952.pdf&fileName=社会团体授权委托书';break;
    } 
  },
  methods:{
    // 删除委托书及各种书
    delcert(v,q){
      // 判断是否可以编辑
      if(this.typeShow.isReadOnly)return;
      switch(v){
        case "pow1": this.certi.pow1 = false; this.err.pow = false; this.par.fPowerUrl.splice(this.par.fPowerUrl.findIndex(item => item === q), 1) ;break;
        case "pow2": this.certi.pow2 = false; this.err.pow = false; this.par.fPowerUrl.splice(this.par.fPowerUrl.findIndex(item => item === q), 1);break;
        case "oth1": this.certi.oth1 = false; this.err.oth = false;  this.par.fBusinessUrl.splice(this.par.fBusinessUrl.findIndex(item => item === q), 1) ;break;
        case "oth2": this.certi.oth2 = false; this.err.oth = false; this.par.fBusinessUrl.splice(this.par.fBusinessUrl.findIndex(item => item === q), 1);break;
      }      
    },
    // 上传委托书及各种书
    uploadFile(target,v) {
      var fileObj = target.srcElement.files[0];
      if(fileObj == undefined) return;
      var fd = new FormData();
      fd.append("uploadFile", fileObj);
	    $.ajax({
	        type:"post",
	        url:"/upLoadFile/uploadImageWithWatermark",
	        data:fd,
			    processData:false,
	        contentType:false,
	        success:data=>{ 
            let upPic = fileObj.name + "||"+data;
            if(v==1){
              if(this.par.fPowerUrl.length>1){
                this.err.pow = true;
                this.err.powN = '最多上传两个！'
              }else{
                this.par.fPowerUrl.push(upPic)
                if (!this.certi.pow1) {
                  this.certi.pow1 = true;
                  this.certi.powName1 = fileObj.name;
                  this.certi.powUrl1 = data;
                }else if (!this.certi.pow2) {
                  this.certi.pow2 = true;
                  this.certi.powName2 = fileObj.name;
                  this.certi.powUrl2 = data;
                }
              }             
            }else if(v==0){
              if(this.par.fBusinessUrl.length>1){
                this.err.oth = true;
                this.err.othN = '最多上传两个！'
              }else{
                this.par.fBusinessUrl.push(upPic)
                if (!this.certi.oth1) {
                  this.certi.oth1 = true;
                  this.certi.othName1 = fileObj.name;
                  this.certi.othUrl1 = data;
                }else if(!this.certi.oth2) {
                  this.certi.oth2 = true;
                  this.certi.othName2 = fileObj.name;
                  this.certi.othUrl2 = data;
                }
              }
            }
	        }
	    });
    },
      // 获取选择的省市区
      getAddress(v){
        this.par.fAddressDistrict = v[0].fProvince+'>'+v[1].fCity;
        if(v[2].fDistrict) this.par.fAddressDistrict+='>'+v[2].fDistrict;
        if(v[3].fStreet) this.par.fAddressDistrict+='>'+v[3].fStreet;
        this.par.fPostalCode = v[4].fCode
        this.AddrShow = false;
        $('.inp1').removeClass('err');
      },
      showAddr(){
        if(!this.typeShow.isReadOnly){
          this.AddrShow = !this.AddrShow;
        }
      },
      // 重新认证
      reIden(){
        this.success=false
        this.inP=false
        this.fail=false
        this.typeShow.isReadOnly = false;
        this.typeShow.sSubm = true;
        this.par.fAddressDistrict = '';
        this.par.fAddressTown = '';
        this.par.fPostalCode = '';
        this.par.fBusinessName = '';
        this.par.fBusinessNumber = '';
        this.par.fPhoneNum = '';
        this.par.fCapital = '';
        this.par.fBusinessUrl = [];
        this.par.fPowerUrl = [];
        this.certi.pow1 = false;
        this.certi.pow2 = false;
        this.certi.powName1 = '';
        this.certi.powName2 = '';
        this.certi.powUrl1 = '';
        this.certi.powUrl2 = '';
        this.certi.oth1 = false;
        this.certi.oth2 = false;
        this.certi.othName1 = '';
        this.certi.othName2 = '';
        this.certi.othUrl1 = '';
        this.certi.othUrl2 = '';
      },
      // 图标移动
      iconMove(){
        this.subM()
      },
      iconEnter(num){
        this.$refs.icon.src = this.pic.Hgoweb ;
        $('.subm').css('color','#3D9BE9')
      },
      iconLeave(){
        this.$refs.icon.src = this.pic.goweb;
        $('.subm').css('color','black')
      }, 
    // 动态校验
      checkDetAddr(e){ //校验详细地址
        let val = e.target.value;
        this.par.fAddressTown = val;
        if (Reg.getByteLen(val) < 6) {
          this.err.detAddrErr = true;
        } else {
          $('.inp2').removeClass('err');
          this.err.detAddrErr = false;
        }
      },        
      checkPerson(e){ //校验联系人
        let val = e.target.value;
        this.par.fBusinessName = val;
        $('.inp3').removeClass('err');
        this.err.personErr = false;
      },  
      checkPhone(e){ //校验固定电话
        let val = e.target.value;
        this.par.fPhoneNum = val;
        $('.inp4').removeClass('err');
        this.err.phoneErr = false;
      },     
      checkCredit(e){ //校验社会信用代码
        let val = e.target.value;
        this.par.fBusinessNumber = val;
        $('.inp4').removeClass('err');
        this.err.creditErr = false;
      },  
      checkFunds(e){ //校验注册资金
        let val = e.target.value;
        this.par.fCapital = val;
        $('.inp5').removeClass('err');
        this.err.fundsErr = false;
      },  

    // 提交申请按钮
      subM(){
        console.log(this.par)
        if(this.par.fAddressDistrict == ''){
          $('.inp1').addClass("err")
          return;
        }else{
          $('.inp1').removeClass('err');
        }
        if(this.par.fAddressTown == ''){
          this.err.detAddrErr = true;
          $('.inp2').addClass("err");
          return;
        }else{
          this.err.detAddrErr = false;
          $('.inp2').removeClass('err');
        }
        if(this.par.fBusinessName == ''){
          this.err.personErr = true;
          $('.inp3').addClass("err");
          return;
        }else{
          this.err.personErr = false;
          $('.inp3').removeClass('err');
        }
        if(this.par.fPhoneNum == ''){
          this.err.phoneErr = true;
          $('.inp4').addClass("err");
          return;
        }else{
          this.err.phoneErr = false;
          $('.inp4').removeClass('err');
        }
        // 仅限公司类型
        if(this.par.fBusinessNumber == '' && this.par.fShopEntrepType == 'COMPANY'){
          this.err.creditErr = true;
          $('.inp5').addClass("err");
          return;
        }else{
          this.err.creditErr = false;
          $('.inp5').removeClass('err');
        }        
        if(this.par.fCapital == '' && this.par.fShopEntrepType == 'COMPANY'){
          this.err.fundsErr = true;
          $('.inp6').addClass("err");
          return;
        }else{
          this.err.fundsErr = false;
          $('.inp6').removeClass('err');
        }
        // 其他类证书
        if(this.par.fBusinessUrl.length ==0){
          this.err.oth = true;
          this.err.othN = '请上传！'
          return;
        }else{
          this.err.oth = false;
          this.par.fBusinessUrl = JSON.stringify(this.par.fBusinessUrl)
        }
        // 授权书
        if(this.par.fPowerUrl.length ==0){
          this.err.pow = true;
          this.err.powN = '请上传！'
          return;
        }else{
          this.err.pow = false;
          this.par.fPowerUrl = JSON.stringify(this.par.fPowerUrl)
        }
        this.loadGif = false;
        // 提交主体审核
        $.ajax({
          type: 'GET',
          data: this.par,
          url: this.InterfaceAddr.auditSub,
          success: data => {
            console.log(data)
            if(data.status == 0){
              console.log(data)
              this.$router.go(0)
            }else{
              console.log('请求异常')
            }
          },
          error: err => {
            console.log('错误');
          }
        }) 
      },

  }
}
</script>
<style lang='scss' scoped>
.goMem{
  width: 30px;
  height: 30px;
}
.goMem .right{
  margin-left: 0px;
  transition: margin-left 1s ease-in-out;
}
.goMem:hover .right{
  margin-left: 15px;
  transition: margin-left 1s ease-in-out;
}
  .inp{
    width: 400px;
    height: 40px;
    box-sizing: border-box;
    padding: 0 20px;
    border: 1px solid #cccccc;
  }
  input:disabled{
    background: white;
  }
  .err{
    border: 1px solid #db0000;
  }
  .inp:focus {outline: none; border:1px solid #2FB7EC; box-shadow: 1px 1px 1px #2FB7EC; color: black; font-size: 16px;}
.identSubject{
  padding-top: 100px;
  .top{
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
  }
  .tit{
    width: 700px;
    height: 60px;
    font-size: 40px;
    font-weight: 400;
    text-align: center;
    line-height: 60px;
    margin: 40px auto 10px;
  }
  .status{
    width: 600px;
    height: 100px;
    background: #E8F5FB;
    margin:20px auto 10px;
    .left{
      width: 40px;
    }
    .right{
      width: 76%;
      p:nth-child(1){
        line-height: 40px;
      }
      p:nth-child(2){
        line-height: 20px;
      }  
      // .reIden{
        
      // }   
      .reIden:hover{
        color:#3D9BE9;
      } 
    }
  }
  .addOptions{
    width: 740px;
    margin:20px auto 10px;
    li{
      width: 100%;
      min-height: 40px;
      margin: 20px auto;
      position: relative;
      .selAddr{
        left: 160px;
        top: 44px;
      }
      .optit{
        width: 160px;
        height: 40px;
        display: inline-block;
        text-align: right;
        line-height: 40px;
      }
      .errCot{
        display:inline-block; color:#db0000; font-size:12px;
        img{width: 16px;}
      }
      .downPow{
        width: 540px;
        height: 30px;
        display:block;
        margin-left: 158px;
        line-height: 30px;
        text-align: left;
        font-size: 12px;
      }
      .downPow:hover{
        color:#3D9BE9;
      }
      .hand{
        width: 290px;
        .subm{
          margin-left: 160px;
        }
      }
      .uplod{
        opacity: 0;
        position: absolute;
        left: 159px;
        top: -1px;
      }
      .certificate{
          width:400px;
          height: 60px;
          margin-left: 160px; 
        .cerName{
          width: 100%;
          height: 30px;
          line-height: 40px;
        }
        .cerPic{
          height: 30px;
          .cerPicOne{
            width: 360px;
            height: 20px;;
            background:#3D9BE9; 
          }
          .cerPicTwo{
            width: 20px;
            height: auto;
          }
        }
      }
    }

  }
  
}

</style>
