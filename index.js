var controller = require('./js/controller'),
    ejs = require('ejs'),
    fs = require('fs');

function renderTmpl(data) {
    var tmpl = fs.readFileSync('./view/index.ejs', 'utf-8'),
        output = ejs.render(tmpl, {
            mData: data
        });
    console.log(output);
    insertHtml(output);
}

function insertHtml(html) {
    $('#wrapper').html(html);
    console.log(html);
}
controller.loadData(renderTmpl);