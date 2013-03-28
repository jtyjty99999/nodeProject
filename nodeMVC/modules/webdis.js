/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-22
 * Time: 下午5:35
 * To change this template use File | Settings | File Templates.
 */
var http = require('http');
var buffer = require('../lib/buffer');
function toWebDis(options, callback) {
    // console.log("Starting get NatureVal @"+data);
    var options = options || {
        host:'192.168.1.6',
        port:7379,
        path:'/MGET/123456:cellphonenumber/',
        method:'get',
    };
    var req = http.get(options, function (res) {
        var bufferHelper = new buffer();
        res.setEncoding('utf8');
        res.on('error',function (e) {
            console.log("Got error: " + e.message);
        }).on('data',function (chunk) {
                bufferHelper.concat(chunk);
            }).on('end', function () {
                var result = bufferHelper.toBuffer().toString();
                callback.call(this, result);
            })
    });
    req.on('error', function (e) {
        console.log("Got error: " + e.message)
    })
}
exports.toWebDis = toWebDis;