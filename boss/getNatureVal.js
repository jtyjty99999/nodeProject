var http = require('http');
var BufferHelper = require('./bufferHelper');
function getCellphone(data,callback) {
   // console.log("Starting get NatureVal @"+data);
    var options = {
        host:'192.168.1.6',
        port:7379,
        path:'/MGET/' + data + ':cellphonenumber/',
        method:'get'
    };
   var req =  http.get(options, function (res) {
       var bufferHelper = new BufferHelper();
        /*
       console.log('STATUS: ' + res.statusCode);
     console.log('HEADERS: ' + JSON.stringify(res.headers));
     */
        res.on('error',function (e) {
    //        console.log("Got error: " + e.message);
        }).on('data', function (chunk) {
                bufferHelper.concat(chunk);
            }).on('end',function(){
                var result = bufferHelper.toBuffer().toString();
                try {
                    var cellphone = JSON.parse(result).MGET[0];
                    callback(cellphone);
                } catch (e) {
                  //  console.log(e.name);     // "MyError"
                 //   console.log(e.message);     // "MyError"
                    console.log('数据格式不正确')
                }
            })
    });
    req.on('error', function(e) {
    //    console.log("Got error: " + e.message)
    })
}
exports.getCellphone = getCellphone;