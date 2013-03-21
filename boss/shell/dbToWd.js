var http = require('http');
var store = require('./store')

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.1.3',
    user     : 'root',
    password : 'c1N+hUjANg0s7!A',
    database:'coreIdentification'
});

connection.connect();

connection.query('SELECT * FROM mirrtalkActivation', function(err, rows, fields) {

    if (err) throw err;
    var l = rows.length;
    for(var i= 0;i<l;i++){
        var cellphone = rows[i]['cellphonenumber'],imei = rows[i]['imei'],imsi = rows[i]['imsi'],userid=rows[i]['userid'],tsplocation=rows[i]['tsplocation'];
        var url = '/MSET/';
        url+=userid+':cellphonenumber/'+cellphone+'/'+userid+':imei/'+imei+'/'+userid+':imsi/'+imsi+'/'+userid+':tsplocation/'+tsplocation;
        var option ={
            host:'192.168.1.3',
            port:7379,
            path:url,
            method:'get'
        };
        store.toWebdis(option,console.log('ok'))
    }
});


connection.end();