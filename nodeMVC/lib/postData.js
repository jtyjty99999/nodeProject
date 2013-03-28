/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-22
 * Time: 下午5:55
 * To change this template use File | Settings | File Templates.
 */
var http = require('http');
var querystring = require('querystring');
var buffer = require('./buffer');
/*浅拷贝*/
var extend = function(result, source) {
    for (var key in source)
        result[key] = source[key];
    return result;
}
/*发送http请求*/
function send(data,options,callback) {
var data = data || {
    sys_text : '构造字符串”欢迎回来，道客'+cellphone.slice(cellphone.length-4,cellphone.length)+',您的语镜已经连接系统，请安全驾驶',
    interval : '1440',
    agent: '超级管理员',
    userid :userid,
}
    var post_data = querystring.stringify(data);
    var opt= {
        host:'192.168.1.3',
        port:8080,
        path:'123',
        method:'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };
    var options = extend(opt,options,true);
    var req = http.request(opt, function (res) {
        var bufferHelper = new buffer();
        res.setEncoding('utf8');
        res.on('error',function (e) {
           console.log("Got error: " + e.message);
        }).on('data', function (chunk) {
                bufferHelper.concat(chunk);
            }).on('end', function () {
                var result = bufferHelper.toBuffer().toString();
                callback.call(this, result);
            });
    });
    req.on('error', function(e) {
        console.log("Got error: " + e.message)
    })
    req.write(post_data + "\n");
    req.end();
}
exports.send = send