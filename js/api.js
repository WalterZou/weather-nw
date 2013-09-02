/**
 * Created with JetBrains WebStorm.
 * User: Walter Zou
 * Date: 13-8-30
 * Time: 下午4:53
 * To change this template use File | Settings | File Templates.
 */
var http=require('http');
var options={
	key:'b2d33ba8014fb955a9da2c69b2e71e9f',
	action:'moreday'
}
function getDataByApi(options){
	var url='http://www.tianqiyubao.com/api/api.php?'+'key='+options.key+'&action='+options.action;
	var req=http.get(url,function(res){
		console.log("StatusCode:"+res.statusCode);
		console.log("Headers:"+JSON.stringify(res.headers));
		var str='';
		res.on('data',function(chunk){
			str+=chunk;
		})
		res.on('end',function(){
			localizeData(str,options.action);
		})
	}).on('error',function(e){
			console.log("Error:"+ e.message);
		});
	req.end();
}
function localizeData(str,act){
	var localStorage=window.localStorage;
	localStorage.setItem(act,str);
}
exports=module.exports=getDataByApi;



