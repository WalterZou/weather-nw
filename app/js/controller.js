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
    path = require('path'),
    spider=require('./spider'),
    async=require('async');

function loadData(type,dis){
    var str = fs.readFileSync(path.join(__dirname,type+'.json'),'utf-8');
    if(str!==''){
        var data = JSON.parse(str),
            nowDate = new Date().Format('yyyy-MM-dd');
        if(data.update==nowDate){
            return data.data[0];
        }else{
            reSpider(dis);
        }
    }else{
        reSpider(dis);
    }
    function reSpider(dis){
        async.series([function(){
            spider.downloadAllData(dis);
        },function(){
            loadData(type,dis);
        }],function(err,results){
            if(err){
                console.log('err',err);
            }else{
                console.log('results',results);
            }
        })
    }
}

exports.getData=function(dis,callback){
    async.parallel({
        moreday:function(cb){
            cb(null,loadData('moreday',dis));
//        console.log(loadData('moreday'));
        },
        zhishu:function(cb){
            cb(null,loadData('zhishu',dis));
//        loadData('zhishu');
        },
        current:function(cb){
            cb(null,loadData('current',dis));
//        loadData('current');
        }
    },function(err,results){
        callback(results);
    })
}
