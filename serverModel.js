var http = require("http");
var url = require("url");
var querystring = require("querystring");
var EventProxy = require('eventproxy');//异步事件代理模块
var nature = require("./getNatureVal");//静态变量处理模块
var requestHandlers = require("./requestHandlers");//业务处理模块
//http://192.168.1.3:7379/HGET/123:cellphonenumber/
function start(handle) {
    function onRequest(request, response) {
        //console.log(request.url);
        var urlObj = url.parse(request.url);
        var pathname = urlObj.pathname;
        var query = querystring.parse(urlObj.query);
        var time = query.time,configupload = JSON.parse(query.configupload);
        var uid = configupload.userid;
        var ep = new EventProxy();
        ep.all('cellphone', function (cellphone) {
          //  requestHandlers.sender(uid, cellphone);
            requestHandlers.record(uid, time);
        });
        nature.getCellphone(uid, function (content) {
            ep.emit('cellphone', content);
        });
    }
    var server = http.createServer(onRequest).listen(8888);
    server.on('request',function(req,res){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<h1>ok</h1>')
        res.end()
    })
   // console.log("Server has started.");
}

exports.start = start;//定义模块给外面的函数