var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    ,fs = require('fs')
    ,juicer = require('juicer');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.engine('html', function (path, options, fn) {
        fs.readFile(path, 'utf8', function (err, str) {
            if (err) return fn(err);
            str = juicer(str, options);
            fn(null, str);
        });
    });
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

routes(app);

app.configure('development', function () {
    app.use(express.errorHandler());
});


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
