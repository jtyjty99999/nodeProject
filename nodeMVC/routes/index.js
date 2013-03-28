var site = require('../controller/site');

module.exports = function(app){
    app.get('/', site.index);
    app.get('/home', site.home);
    app.get('/login', site.showLogin);
    app.post('/login', site.login);
    app.get('/logout', site.logout);
}