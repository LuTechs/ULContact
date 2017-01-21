/**
 * Created by LENG on 11/05/2016.
 */

var Model = require('../models')
var validator = require('validator');
exports.getLogin = function (req, res, next) {
  var errMsg = req.flash("loginMessage");
  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  }
  var email=req.session.loginEmail;
  req.session.loginEmail=null;
  res.render('user_view/login', {layout: 'user_view/user_view_layout', errorMsg: errMsg,email:email});
}

exports.getRegister = function (req, res, next) {

  var errMsg = {
    isInvalidEmail: req.flash('registerIsInvalidEmail')[0],
    isInvalidPassword:req.flash('registerIsInvalidPassword')[0],
    email: req.flash('registerEmailMsg')[0],
    password: req.flash('registerPasswordMsg')[0]
  }
  var emailInput=req.session.email;
  req.session.email=null;
  res.render('user_view/register', {layout: 'user_view/user_view_layout', errorMsg: errMsg,data:{email:emailInput}});
}


exports.postRegister = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var user = {email: email, password: password};

  var loginUser;
  Model.sequelize.transaction(function (t) {
    return Model.User.create(user, {transaction: t})
      .then(newCreatedUser => {
        loginUser = newCreatedUser;
        return Model.Group.create({name: 'All', default: true, userId: newCreatedUser.id}, {transaction: t});
      })

  }).then(group => {
    req.login(loginUser, function (err) {
      if (err) {
        return err;
      }
      return res.redirect('/index');
    });

  }).catch(err=> {
    next(err);
  });

}
