var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport=require('passport');
var hbs = require('hbs');
var _=require('lodash');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerHelper('sections', function (name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
});
var isDev = process.env.NODE_ENV === 'development';

//Webpack

if (isDev) {
    console.log('Webpack Development');
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');

    var config = require('./webpack.config');
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
    app.use(webpackHotMiddleware(compiler))
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session(
    {
        secret: 'nopassword',
        resave: true,
        saveUninitialized: true
    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport_config')(passport);

app.use('/asset', express.static(path.join(__dirname, 'public')));
app.use('/auth',require('./config/routes/no_auth_routes'));
app.use('/',isLoggedIn, require('./config/routes/auth_routes'));
app.use('/api',isLoggedIn,require('./config/routes/auth_api_routes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/* error handlers
 development error handler
 will print stacktrace
 */
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/*
 production error handler
 no stacktraces leaked to user
 */
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function isLoggedIn(req, res, next) {

    var requestPath=req.path;
    if (req.isAuthenticated())
        return next();
    if(_.startsWith(requestPath,'/api')){
        res.status(401).json({message:'Unauthorized'});
    } else{
        res.redirect('/auth/login');
    }
}

module.exports = app;
