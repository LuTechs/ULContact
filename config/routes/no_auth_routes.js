/**
 * Created by LENG on 16/05/2016.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var validator = require('validator');

//User View
router.get('/login', require('../../controllers/user_controller').getLogin);
router.post('/login', checkEmailAndPasswordField, passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/auth/login'
}));
router.get('/register', require('../../controllers/user_controller').getRegister);
router.post('/register', isValidEmailAndPassword, require('../../controllers/user_controller').postRegister);


function checkEmailAndPasswordField(req, res, next) {
  var email=req.body.email;
  if (!(validator.isEmail(email) && !validator.isNull(req.body.password))) {
    req.session.loginEmail=email;
    req.flash('loginMessage', 'Oops! Wrong password or user');
    res.redirect('/auth/login');
  } else {
    next();
  }
}

function isValidEmailAndPassword(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  var isError = false;
  if (!(validator.isEmail(email))) {
    req.flash('registerIsInvalidEmail', 'true');
    req.flash('registerEmailMsg', 'Invalid email');
    isError = true;
  }

  if (!(validator.equals(password, confirmPassword))) {
    req.flash('registerIsInvalidPassword', 'true');
    req.flash('registerPasswordMsg', 'Password miss match');
    isError = true;
  } else if (validator.isNull(password)) {
    req.flash('registerIsInvalidPassword', 'true');
    req.flash('registerPasswordMsg', 'Password empty');
    isError = true;
  }
  if (!isError) {
    next();
  } else {
    req.session.email=email;
    res.redirect('/auth/register');
  }
}


module.exports = router;
