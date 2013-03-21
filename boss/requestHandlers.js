var http = require('http');
var querystring = require('querystring');
function sender(userid, cellphone) {
//    console.log("Request handler 'sender' was called.");
 //   console.log(userid,cellphone)

    var post_data = querystring.stringify({
        sys_text : '构造字符串”欢迎回来，道客'+cellphone.slice(cellphone.length-4,cellphone.length)+',您的语镜已经连接系统，请安全驾驶',
        interval : '1440',
        agent: '超级管理员',
        userid :userid,
    });

    var options = {
        host:'192.168.1.3',
        port:8080,
        path:'/idts-1.0/httpservice/addweibo/php/add_sys_weibo.php',
        method:'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };

    var req = http.request(options, function (res) {
       // console.log("Got response: " + res.statusCode);
        res.setEncoding('utf8');
        res.on('error',function (e) {
      //      console.log("Got error: " + e.message);
        }).on('data', function (chunk) {
       //         console.log('BODY: ' + chunk);
            });
    });
    req.on('error', function(e) {
      //  console.log("Got error: " + e.message)
    })
    req.write(post_data + "\n");
    req.end();
}
function record(userid, time) {
//    console.log("Request handler 'record' was called.");
 //   console.log(userid,time)
    var options = {
        host:'192.168.1.6',
        port:7379,
        path:'/SADD/' + userid + ':config/' + '2013-03-09'+Math.random(),
        method:'get'
    };
    var req = http.get(options, function (res) {
        //console.log("Got response: " + res.statusCode);
        res.on('error',function (e) {
       //     console.log("Got error: " + e.message);
        }).on('data', function (chunk) {
       //         console.log('BODY: ' + chunk);
            });
    });
    req.on('error', function(e) {
      //  console.log("Got error: " + e.message)
    })
}

exports.sender = sender;
exports.record = record;