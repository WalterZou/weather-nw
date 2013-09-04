/**
 * Created with JetBrains WebStorm.
 * User: Walter Zou
 * Date: 13-9-2
 * Time: 上午10:25
 * To change this template use File | Settings | File Templates.
 */
"use strict";
var http = require('http'),
    fs = require('fs'),
    path = require('path');
var options={
    key: '6cccedcf841019b3a6dee96205fa719c',
    action: 'moreday'
};
function getDataByApi(options,callback) {
    var url = 'http://www.tianqiyubao.com/api/api.php?' + 'key=' + options.key + '&action=' + options.action;
    var req = http.get(url, function (res) {
        console.log("StatusCode:"+res.statusCode);
        console.log("Headers:"+JSON.stringify(res.headers));
        var str = '';
        res.on('data', function (chunk) {
            str += chunk;
        })
        res.on('end', function () {
            var data = JSON.parse(str);
            data.update = new Date().Format("yyyy-MM-dd");
            fs.writeFile(path.join(__dirname, options.action+'.json'), JSON.stringify(data), function (err) {
                if (err) throw err;
                console.log('数据写入成功');
                loadData(callback);
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
function getData(callback){
	fs.readFile(path.join(__dirname, options.action+'.json'),function(err,data){
		if (err){
			getDataByApi(options);
			console.log('err',err);
		}else{
			data=JSON.parse(data.toString());
			var nowDate=new Date().Format('yyyy-MM-dd');
			if(data.update!=nowDate){
				getDataByApi(options);
			}else{
				console.log('数据读取成功');
				callback(data.data[0]);
			}
		}
	})
}
function loadData(callback){
    var str = fs.readFileSync(path.join(__dirname,options.action+'.json'),'utf-8');
    if(str!==''){
        var data = JSON.parse(str),
            nowDate = new Date().Format('yyyy-MM-dd');
        if(data.update==nowDate){
            callback(data.data[0]);
        }else{
            getDataByApi(options,callback);
        }
    }else{
        getDataByApi(options,callback);
    }
}
exports.loadData=loadData;
