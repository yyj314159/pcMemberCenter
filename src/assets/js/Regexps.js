export default {
    regexpN(Val,reg){//纯数字判断
        reg =  /^[0-9]*$/gi; //判断所有的都是整数
        return reg.test(Val);
      },
      regexNum(Val,reg){//只包含数字;
        reg =  /^[0-9]*$/gi; //判断所有的都是整数
        return reg.test(Val);
      },
      regexpLetter(Val,reg){//只包含字母;
        reg =  /^[A-Za-z]*$/gi; //判断所有的都是整数
        return reg.test(Val);
      },
      regexpNoE(Val,reg){//只包含数字和字母;
        reg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/gi; //判断所有的都是整数
        return reg.test(Val);
      },
      regexpNo(Val,reg){//只包含汉字数字和字母和“-”;
        reg =  /^[-0-9A-Za-z\u4E00-\u9FFF]*$/gi; //判断所有的都是整数
        return reg.test(Val);
      },
      regexpP(phone){ //验证手机号
       return  /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone);
      },
      regexpIdC(idCart){//身份证校验 身份证有15位和18位的校验
       const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
       const reg2 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
         return  reg.test(idCart) || reg2.test(idCart);
      },
      regexpT(idCart){//台胞证
        const reg = /^([0-9]{8}|[0-9]{10}|[0-9]{18}|[0-9]{10}\([A-Z]\))$/;
         return  reg.test(idCart);
      },
      regexpH(idCart){//护照校验
        const reg = /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/;
         return  reg.test(idCart);
      },
      regexdM(idCart){//域名校验
        const reg = /^[0-9a-zA-Z\u4e00-\u9faf]+[0-9a-zA-Z\u4e00-\u9faf\.-]*\.[a-zA-Z\u4e00-\u9faf]{2,10}$/;
         return  reg.test(idCart);
      },  
      regexpSpecialChar(str){//特殊字符
        var reg = /[`~@#$^&%*1234567890=|{}':;',\[\]\.<>\/\?~！@#￥&\*（）\\…|{}【】‘；：'"”“'。，、？\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]]/;
         return  reg.test(str);
      },
      getByteLen(val) {//统计字符串的长度一个汉字两个字符
        var len = 0;
        for (var i = 0; i < val.length; i++) {
          var a = val.charAt(i);
          if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
          }
          else {
            len += 1;
          }
        }
        return len;
      },
}