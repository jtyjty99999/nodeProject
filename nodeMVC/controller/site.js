/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-20
 * Time: 下午5:52
 */
var db = require('../modules/db');
exports.index = function (req, res) {
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