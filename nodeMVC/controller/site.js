/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-20
 * Time: 下午5:44
 */
var db = require('../modules/db'),
    webdis = require('../modules/webdis'),
    postData = require('../lib/postData'),
    config = require('../config').config;
var check = require('validator').check,
    sanitize = require('validator').sanitize;
var crypto = require('crypto');
/*处理空值与注入*/
function handleParam(params){
    var params = params || {};
    var safeParam = {};
    for(var key in params){
        var trimed = sanitize(params[key]).xss();
        var blockXssed = sanitize(trimed).xss();
            safeParam[key] = blockXssed
    }
    return safeParam
}
/*session无效验证*/
function noSession(req,res){
    if (!req.session || !req.session.user) {
        res.redirect('login');
        return;
    }
}
//加密
function encrypt(str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}
//解密
function decrypt(str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
//md5
function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}
// 创建session
function gen_session(user, res) {
    var auth_token = encrypt(user.username + '\t' + user.password, config.session_secret);
    res.cookie(config.auth_cookie_name, auth_token, {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}); //cookie 有效期30天
}

/*浅拷贝*/
var extend = function(result, source) {
    for (var key in source)
        result[key] = source[key];
    return result;
}
exports.home = function (req, res) {
    var query = new db.orm;
    query.init();
    query.exec('SELECT * FROM mirrtalkActivation', function (rows, fields) {
        var l = rows.length,i= 0,data = {'list':[]}
        for(;i<l;i++){
            data.list.push(rows[i])
        }
        res.render('index',data);
    })
    query.end()
};
exports.index = function (req, res) {
    res.render('index',[]);
};
exports.home = function (req, res) {
   noSession(req,res);
    res.render('home',[]);
};
exports.showLogin = function (req, res) {
    res.render('login',[]);
};
exports.login = function (req, res) {
    /*处理空值与注入*/
var param = handleParam(req.body)
    console.log(param)
    var data ={
        parament : param.username,
        password: param.password,
        route: 'checkLogin',
    }
    var userLoginConf = config.apiService.userLogin;
    postData.send(data,userLoginConf,function(result){
    console.log(result)
        if(result ==0){
            var user = {
                'username':data.parament,
                'password':data.password
            }
            gen_session(user, res);
/*
            //check at some page just jump to home page
            var refer = req.session._loginReferer || 'home';
            for (var i = 0, len = notJump.length; i !== len; ++i) {
                if (refer.indexOf(notJump[i]) >= 0) {
                    refer = 'home';
                    break;
                }
            }
            res.redirect(refer);
            */
            req.session.regenerate(function(){
                // Store the user's primary key
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = user.username;
                res.render('home',[]);
            });
        }else{
            res.render('login',[]);
        }
    })
};
exports.logout = function (req, res, next) {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, { path: '/' });
    res.redirect(req.headers.referer || 'login');
};
