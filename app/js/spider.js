/**
 * Created with JetBrains WebStorm.
 * User: Walter Zou
 * Date: 13-9-5
 * Time: 上午11:52
 * To change this template use File | Settings | File Templates.
 */
var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    async=require('async'),
    moredayOpt={
        action: 'moreday',
        search:''
    },
    zhishuOpt={
        action:'zhishu',
        search:''
    },
    currentOpt={
        action:'current',
        search:''
    }
function getDataByApi(options,dis) {
    var url,
    search=''|dis;
    if(search!=''){
        url = 'http://www.tianqiyubao.com/api/api.php?key=6cccedcf841019b3a6dee96205fa719c&action=' + options.action+'&search='+options.search;
    }else{
        url = 'http://www.tianqiyubao.com/api/api.php?key=6cccedcf841019b3a6dee96205fa719c&action=' + options.action;
    }
    var req = http.get(url, function (res) {
        console.log("StatusCode:"+res.statusCode);
        console.log("Headers:"+JSON.stringify(res.headers));
        var str = '';
        res.on('data', function (chunk) {
            str += chunk;
        })
        res.on('end', function () {
            var data = JSON.parse(str);
            data.update = new Date().Format('yyyy-MM-dd');
            if(options.action=='current'){
                data.time=new Date().getHours();
            }
            fs.writeFile(path.join(__dirname, options.action+'.json'), JSON.stringify(data), function (err) {
                if (err) throw err;
                console.log('数据写入成功');
            });
        });
    }).on('error', function (e) {
            console.log("Error:" + e.message);
        });
    req.end();
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
exports.downloadAllData=function(dis){
    async.parallel({
        moreday:function(){
            getDataByApi(moredayOpt,dis);
        },
        zhishu:function(){
            getDataByApi(zhishuOpt,dis)
        },
        current:function(){
            getDataByApi(currentOpt,dis)
        }
    },function(err,results){
        if(err){
            console.log('err',err);
        }else{
            console.log('results',results);
        }
    })
}
exports.downloadCurrentData=function(){

}