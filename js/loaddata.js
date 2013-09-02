/**
 * Created with JetBrains WebStorm.
 * User: Walter Zou
 * Date: 13-9-2
 * Time: 上午10:25
 * To change this template use File | Settings | File Templates.
 */
var _d=window._d;
var _d={
	w:function(data){
		document.write(data);
	},
	wd:function(day,source,item,m){
		_d.w(getData(day,source,item,m))
	}
}
function getData(day,source,item,m){
	var storage=window.localStorage,
	str=storage.getItem(source);
	var data=JSON.parse(str).data[0];
	for(var i= 0;i<data.length;i++){
		if(data[i].date==day){
			if(m==2){
				return data[i][item];

			}else{
				return data[i]['day_night'][m][item];
			}
		}
	}
}