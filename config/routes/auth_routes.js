var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function (req, res, next) {
    res.render('contact_view/index', {title: 'Marketing App'});
});
router.get('/index', function (req, res, next) {
    res.render('contact_view/index', {title: 'Marketing App'});
});

router.get('/schedule',function (req,res,next) {
   res.render('schedule_view/index');
});

/* Logout */
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/auth/login');
});



module.exports = router;
