function getCellphone(data,callback) {
   // console.log("Starting get NatureVal @"+data);
    var http = require('http');
    var options = {
        host:'192.168.1.6',
        port:7379,
        path:'/MGET/' + data + ':cellphonenumber/',
        method:'get'
    };
   var req =  http.get(options, function (res) {
        /*
       console.log('STATUS: ' + res.statusCode);
     console.log('HEADERS: ' + JSON.stringify(res.headers));
     */
        res.on('error',function (e) {
    //        console.log("Got error: " + e.message);
        }).on('data', function (chunk) {
                var cellphone = JSON.parse(chunk).MGET[0]
               callback(cellphone)
            });
    });
    req.on('error', function(e) {
    //    console.log("Got error: " + e.message)
    })
}
exports.getCellphone = getCellphone;