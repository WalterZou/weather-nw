/**
 * Created with JetBrains WebStorm.
 * User: Walter Zou
 * Date: 13-9-2
 * Time: 上午10:25
 * To change this template use File | Settings | File Templates.
 */
var getDataByApi=require('./js/api.js');
function getData(day,source){
	var storage=window.localStorage;
	if(storage){
		var str=storage.getItem(source);
		var data=JSON.parse(str).data[0];
		for(var i= 0;i<data.length;i++){
			if(data[i].date==day){
					return data;
			}
		}
	}else{
		getDataByApi('2013-09-02');
		getData(day,source);
	}
}
