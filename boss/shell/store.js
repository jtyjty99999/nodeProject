var http = require('http');
function toWebdis(options, connectCallback,errorCallback) {
    var options = options || {
        host:'192.168.1.6',
        port:7379,
        path:'/SADD/' + 'niaAOVU2lg' + ':config/' + '2013-03-09' + Math.random(),
        method:'get'
    };
    var req = http.get(options, function (res) {
        if (typeof connectCallback === "function") {
            connectCallback()
        }
        res.on('error', function (e) {
          //  console.log('e')
        }).on('data', function (chunk) {
                //console.log(JSON.parse(chunk))
            })
    });
    req.end()
}

exports.toWebdis =toWebdis