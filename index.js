var controller=require('./js/controller'),
	ejs=require('ejs'),
	fs=require('fs');
controller.getData('2013-09-03',renderTmpl);
function renderTmpl(data){
	console.log('render',data,typeof (data));
	var tmpl=fs.readFileSync('./view/index.ejs','utf-8');
	var output=ejs.render(tmpl,{mData:data});
	insertHtml(output);
}
function insertHtml(html){
	$('#wrapper').html(html);
}
