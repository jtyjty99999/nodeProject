var http = require("http");
function start(handle) {
    function onRequest(request, response) {
        var options = {
            host:'192.168.1.6',
            port:7379,
            path:'/SADD/' + 'niaAOVU2lg' + ':config/' + '2013-03-09'+Math.random(),
            method:'get'
        };
        var req = http.get(options, function (res) {
            //    console.log("Got response: " + res.statusCode);
            res.on('error',function (e) {
                //     console.log("Got error: " + e.message);
            }).on('data', function (chunk) {
                    //         console.log('BODY: ' + chunk);
                });
        });
        req.on('error', function(e) {
            //  console.log("Got error: " + e.message)
        })
        req.end()
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end()
    }
    var server = http.createServer(onRequest).listen(8888);
}

exports.start = start;//定义模块给外面的函数