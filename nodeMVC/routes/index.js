var site = require('../controller/site');

module.exports = function(app){
    app.get('/', site.index);
}