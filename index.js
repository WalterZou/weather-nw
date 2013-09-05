var controller = require('./js/spider'),
    ejs = require('ejs'),
    fs = require('fs');

function renderTmpl(data) {
    var tmpl = fs.readFileSync('./view/index.ejs', 'utf-8'),
        output = ejs.render(tmpl,data);
    insertHtml(output);
}

function insertHtml(html) {
//    $('#wrapper').html(html);
    console.log('ejs',html);
}
controller.downloadAllData(null,renderTmpl);
