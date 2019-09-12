// 用于存放公共方法
export default {
    //字符串转换
    processTagReplace(str) {
        str = str.replaceAll("<", "&lt;")
        str = str.replaceAll(">", "&gt;")
        return str;
    },
    // 动态获取图片地址前缀
    getCurrentDomain(type) {
        let addr = '';
        $.ajax({
            type: "GET",
            async: false,
            data: {},
            url: "/z-member/member/getCurrentDomain",
            success: data => {
                switch (type) {
                    case 'audioPath':
                        addr = data.data.audioPath;
                        break;
                    case 'editPath':
                        addr = data.data.editPath;
                        break;
                    case 'imgUrl':
                        addr = data.data.imgUrl;
                        break;
                    case 'rootPath':
                        addr = data.data.rootPath;
                        break;
                    case 'videoPath':
                        addr = data.data.videoPath;
                        break;
                    default:
                        addr = data.data.imgUrl;
                }
            },
            error: err => {
                console.log("error");
            }
        });
        return addr;
    },
    //字符计算，中文2个字符，字母1个字符
    gblen(str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    },
    //获取当前时间，格式YYYY-MM-DD
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    /** 
     * 时间戳转化为年 月 日 时 分 秒 
     * number: 传入时间戳 
     * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
     * number：精确到毫秒
     */
    formatTimeToDate(number, format) {
        var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
        var returnArr = [];
        var date = new Date(number);
        returnArr.push(date.getFullYear());
        returnArr.push(this.formatNumber(date.getMonth() + 1));
        returnArr.push(this.formatNumber(date.getDate()));
        returnArr.push(this.formatNumber(date.getHours()));
        returnArr.push(this.formatNumber(date.getMinutes()));
        returnArr.push(this.formatNumber(date.getSeconds()));
        for (var i in returnArr) {
            format = format.replace(formateArr[i], returnArr[i]);
        }
        return format;
    },
    //数据转化  
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    // 时间戳转换（举例）
    formatDate(secs, type) {
        var t = new Date(secs)
        var year = t.getFullYear()
        var month = t.getMonth() + 1
        if (month < 10) {
            month = '0' + month
        }
        var date = t.getDate()
        if (date < 10) {
            date = '0' + date
        }
        var hour = t.getHours()
        if (hour < 10) {
            hour = '0' + hour
        }
        var minute = t.getMinutes()
        if (minute < 10) {
            minute = '0' + minute
        }
        var second = t.getSeconds()
        if (second < 10) {
            second = '0' + second
        }
        if (type == 0) {
            return '' + year + '/' + month + '/' + date;
        } else if(type==2) {
            return year + '/' + month + '/' + date + ' ' + hour + '：' + minute;
        } else{
            return year + '-' + month + '-' + date;
        }
    },
    // 密码加密方法
    encode(input) {
        var output = "";
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }

        function _utf8_encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
        return output;
    },

    //图片自适应填充

    
    imgAutoAdapt(e,maxWidth,maxHeight){
        let image = new Image();
        // 获取允许的最大宽度和最大高度
        let iWidth = maxWidth;
        let iHeight = maxHeight;
        image.src = e.target.src;
        // console.log(image.width,image.height);
        if (image.width > 0 && image.height > 0) {
            if(image.width / image.height == iWidth / iHeight){
                // console.log(image.width,image.height);
                // 方图
                e.target.width = iWidth;
                e.target.height = iHeight;
                $(e.target).css("marginTop",0);
                $(e.target).css("marginLeft",0);
            }else{
                if(image.width / image.height > iWidth / iHeight){
                    // 横图
                    e.target.width = (image.width * iHeight) / image.height;
                    e.target.height = iHeight;
                    $(e.target).css("marginTop",0);
                    $(e.target).css("marginLeft","-"+Math.ceil(e.target.width-maxWidth)/2+"px");
                }else{
                    // 竖图
                    e.target.width = iWidth;
                    e.target.height = (image.height * iWidth) / image.width;
                    $(e.target).css("marginTop","-"+Math.ceil(e.target.height-maxHeight)/2+"px");
                    $(e.target).css("marginLeft",0);
                }
            }
        }
    },
    // imgAutoAdapt(imgd, countflag) { //imgd图片对象 contflag是否自适应填充
    //     var image = new Image()
    //     var iwidth = imgd.parentNode.offsetWidth;
    //     var iheight = imgd.parentNode.offsetHeight;
    //     //如果本地无效就删除.src,服务器上必须要
    //     image.src = imgd.src;
    //     if (image.width > 0 && image.height > 0) {
    //         if (image.width / image.height == iwidth / iheight) {
    //             // 方图
    //             imgd.width = iwidth;
    //             imgd.height = iheight;
    //             if (countflag) {
    //                 imgd.style.marginTop = 0;
    //                 imgd.style.marginLeft = 0;
    //             }
    //         } else {
    //             if (image.width / image.height > iwidth / iheight) {
    //                 // 横图
    //                 imgd.width = (image.width * iwidth) / image.height;
    //                 imgd.height = iheight;
    //                 if (countflag) {
    //                     imgd.style.marginTop = 0;
    //                     imgd.style.marginLeft = "-" + Math.ceil((imgd.width - iwidth) / 2) + "px";
    //                 }
    //             } else {
    //                 // 竖图
    //                 imgd.width = iwidth;
    //                 imgd.height = (image.height * iwidth) / image.width;
    //                 if (countflag) {
    //                     imgd.style.marginTop = "-" + Math.ceil((imgd.height - iheight) / 2) + "px";
    //                     imgd.style.marginLeft = 0;
    //                 }
    //             }
    //         }
    //     }
    // },
    getcookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;

    },
    setcookie(key, value, t) {
        if (t) {
            let d = new Date();
            d.setDate(d.getDate() + t);
            document.cookie = key + "=" + value + ";expires=" + d;
        } else {
            document.cookie = key + "=" + value;
        }
        if (this.getcookie(key)) {
            console.log('设置成功');
        } else {
            console.log('设置失败');
        }
    },
    remove(key) {
        this.setcookie(key, "1", -1);
        if (!this.getcookie(key)) {
            console.log('删除成功');
        } else {
            console.log('删除失败');
        }
    }
}