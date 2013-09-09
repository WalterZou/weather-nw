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
function getDataByApi(options,dis,callback) {
    var url;
    if(dis!==null){
        url = 'http://www.tianqiyubao.com/api/api.php?key=6cccedcf841019b3a6dee96205fa719c&action=' + options.action+'&search='+dis;
    }else{
        url = 'http://www.tianqiyubao.com/api/api.php?key=6cccedcf841019b3a6dee96205fa719c&action=' + options.action;
    }
    var req=http.get(url, function (res) {
        var str = '';
        res.on('data', function (chunk) {
            str += chunk;
        })
        res.on('end', function () {
            var data = JSON.parse(str);
            console.log('status',data.status);
            callback(data.data[0]);
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
exports.downloadAllData=function(dis,callback){
    async.parallel({
        moreday:function(cb){
            getDataByApi(moredayOpt,dis,function(d){
                cb(null,d);
            });
        },
        zhishu:function(cb){
            getDataByApi(zhishuOpt,dis,function(d){
                cb(null,d);
            });
        },
        current:function(cb){
            getDataByApi(currentOpt,dis,function(d){
                cb(null,d);
            });
        }
    },function(err,results){
        if(err){
            console.log('err',err);
        }else{
            callback(results);
        }
    })
}

