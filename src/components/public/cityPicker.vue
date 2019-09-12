<template>
  <div class="zm-citypicker" v-show="isShow">
    <div class="zm-citypickerBox">
      <ul class="zm-citypickerTab">
        <li :class="{'current':index == 0}" @click.stop="choseTab(0)">省份</li>
        <li :class="{'current':index == 1}" @click.stop="choseTab(1)">城市</li>
        <li :class="{'current':index == 2}" @click.stop="choseTab(2)">县区</li>
        <li :class="{'current':index == 3}" @click.stop="choseTab(3)">街道</li>
      </ul>

      <div class="zm-citypickerCont">
        <div class="zm-provinces" v-show="index == 0">
          <dl>
            <dt>A-G</dt>
            <dd><a 
            v-for="(item,index) in provincesOne" 
            :key="index" 
            @click.stop="choseProv(index,'One',{'fProvinceId':item.i,'fProvince':item.n});"
            :class="{'active':index == nowProv && groupProv == 'One'}"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
          <dl>
            <dt>H-k</dt>
            <dd><a 
            v-for="(item,index) in provincesTow" 
            :key="index" 
            @click.stop="choseProv(index,'Tow',{'fProvinceId':item.i,'fProvince':item.n})"
            :class="{'active':index == nowProv && groupProv == 'Tow'}"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
          <dl>
            <dt>L-S</dt>
            <dd><a 
            v-for="(item,index) in provincesThree" 
            :key="index" 
            :class="{'active':index == nowProv && groupProv == 'Three'}"
            @click.stop="choseProv(index,'Three',{'fProvinceId':item.i,'fProvince':item.n})"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
          <dl>
            <dt>T-Z</dt>
            <dd><a 
            v-for="(item,index) in provincesFour" 
            :key="index" 
            :class="{'active':index == nowProv && groupProv == 'Four'}"
            @click.stop="choseProv(index,'Four',{'fProvinceId':item.i,'fProvince':item.n})"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
        </div>

        <div class="zm-cities" v-show="index == 1">
          <dl>
            <dd><a 
            v-for="(item,index) in city" 
            :key="index" 
            :class="{'active':index === nowCity}"
            @click.stop="choseCity(index,{'fCityId':item.i,'fCity':item.n})"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
        </div>

        <div class="zm-areas" v-show="index == 2">
          <dl>
            <dd><a 
            v-for="(item,index) in area"
            :key="index" 
            :class="{'active':index === nowArea}"
            @click.stop="choseArear(item.i,index,{'fDistrictId':item.i,'fDistrict':item.n})"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
        </div>

        <div class="zm-street" v-show="index == 3">
          <dl v-if="street.length!=0">
            <dd ><a 
            v-for="(item,index) in street" 
            :key="index" 
            :class="{'active':index === nowStreet}"
            @click.stop="choseStreet(index,{'fStreetId':item.i,'fStreet':item.n})"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: "cityPicker",
    props: {
     "isShow":{
        type:Boolean,
        required:false,
        default:false     
     }
  },
  data() {
    return {
      index: "", //选项卡
      nowProv:'',//省会
      nowCity:'',
      nowArea:'',
      nowStreet:'',
      groupProv:'',//省会分组
      nowLocation:'',
      nowLocationDetail:'',
      textLocation:'',//临时储存城市
      provinces:[

      ],//所有数据
      city:[

      ],//
      area:[

      ],//
      street:[],
      sendData:[
        {fProvinceId:0,fProvince:''},
        {fCityId:0,fCity:''},
        {fDistrictId:0,fDistrict:''},
        {fStreetId:0,fStreet:''},
        {fCode:''}
        ],  //位置保存数据
    };
  },
  computed: {
    provincesOne(){
      return this.provinces.filter(item => item.s.charCodeAt(0)>96 && item.s.charCodeAt(0)<104)
    },
    provincesTow(){
      return this.provinces.filter(item => item.s.charCodeAt(0)>103 && item.s.charCodeAt(0)<108)
    },
    provincesThree(){
      return this.provinces.filter(item => item.s.charCodeAt(0)>107 && item.s.charCodeAt(0)<116)
    },
    provincesFour(){
      return this.provinces.filter(item => item.s.charCodeAt(0)>115)
    },

  },
  watch:{
    isShow(v){
      if(v===true){
        this.index = 0;
      }
    }
  },
  methods: {
    choseTab(num) {
      this.index = num;
    },
    choseProv(num,num2,num3) {
        this.nowProv = num;
        this.groupProv = num2;
        this.nowCity = '';
        this.nowArea = '';
        this.nowStreet = '';
        this.area=[];
        this.street=[];
        this.city = this[`provinces${num2}`][num].citys;
        this.index = 1;
        this.sendData[0] = num3;
        this.sendData[1] = {fCityId:0, fCity:''};
        this.sendData[2] = {fDistrictId:0,fDistrict:''}
        this.sendData[3] = {fStreetId:0,fStreet:''}
    },
    choseCity(num,num2) {
        this.nowArea = '';
        this.nowStreet = '';
        this.area=[];
        this.street=[];
        this.area = this[`provinces${this.groupProv}`][this.nowProv].citys[num].areas;
        this.index = 2;
        this.nowCity = num;
        this.nowLocationDetail = num2.fCity;
        this.textLocation=num2.fCity;
        this.sendData[1] = num2;
        this.sendData[2] = {fDistrictId:0,fDistrict:''}
        this.sendData[3] = {fStreetId:0,fStreet:''}
        if(!this.area) this.close();
    },
    choseArear(num,num2,num3) {
      if(this.nowLocationDetail != this.textLocation){
        this.nowLocationDetail = this.textLocation;
      }   
      this.nowStreet = '';
      this.street=[];
      this.index = 3;
      this.nowArea = num2;
      $.ajax({
          url:'/city/getTownData',
          type:'post',
          data:{
              fParentId:num
          },
          success:(res)=>{
              this.street = JSON.parse(res);              
              this.nowLocationDetail = this.nowLocationDetail+' '+num3.fDistrict;
              this.sendData[2] = num3;
              this.sendData[3] = {fStreetId:0,fStreet:''};
              this.sendData[4] = {fCode:this.street[0].p}
              if(this.street.length === 0){
                this.close();
              }
          }
      });
    },
    choseStreet(num,num2) {
      console.log(num,num2)
        this.nowStreet = num;
        this.sendData[3] = num2;
        this.close();
    },
    close() {
      let data = null;
      if(this.sendData[0].fProvinceId !== 0){
        data = this.sendData;
      }
      this.$emit("getAddress",data);//子组件向父组件传值
      this.isShow = false;
    }
  },
  created() {
    $.ajax({
      url:'/city/getAllData',
      success:(res)=>{
        if(res.status === 0){
          let cityData = res.data;
          this.provinces = cityData[0];
          this.provinces.sort( (m,j) =>{
              return m.s.charCodeAt() - j.s.charCodeAt()
          });
          // 市
          this.provinces.forEach(item => {
              this.$set(item,"citys",cityData[item.i]);
              // 区
              item.citys.forEach(v => {
                  this.$set(v,"areas",cityData[v.i]);
              })
          });
        }         
      }
    })
  },
};
</script>

<style lang="scss" scoped>
.zm-citypicker{
    position: absolute;
    z-index: 11;
    width:280px;
    .zm-citypickerBox{
        width: 280px;
        position: relative;
        z-index: 11;
        .zm-citypickerTab{
            height: 35px;
            background: #fff;
            box-sizing: border-box;
            display: flex;
            li{
                padding: 7px 0;
                text-align: center;
                width: 25%;
                color: #0C1F2F;
                font: 400 12px/1.6 arial, sans-serif;
                border: 1px solid #b1d7f6;
                margin-right: 1px;
                border-bottom: none;
                cursor: pointer;
                flex: 1;
                &.current{
                    background: #fff;
                    background-color: #c4e1f8;
                }
            }
            li:last-child{
                margin-right: 0;
            }

        }
        .zm-citypickerCont{
            border: 1px rgba(177, 215, 246, 1) solid;
            padding: 10px 15px;
            // width: 249px;
            background: #fff;
            font-size: 12px;
            dl{
                line-height: 2;
                clear: both;
                padding: 3px 0;
                margin: 0;
                overflow: hidden;
                dt{
                    display: inline-block;
                    // width: 25px;
                    padding-right: 10px;
                    font-weight: 700;
                    color: #CC0066;
                    // text-align: right;
                }
                dd{
                    // width: 270px;
                    display: inline;
                    float: left;
                    margin-left: 0;
                    a{
                        display: block;
                        float: left;
                        color: #0C1F2F;
                        padding: 0 10px;
                        text-decoration: none;
                        margin-right: 2px;
                        border-radius: 2px;
                        &:hover{
                            background-color: #D8EBFB;
                        }
                        &.active{
                            background-color: rgba(196, 225, 248, 1);
                            color: #fff;
                        }
                    }
                    span{
                        color: #ccc;
                    }
                }
            }
        }
    }
}
</style>

