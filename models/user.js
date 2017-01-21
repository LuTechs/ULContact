/**
 * Created by lengung on 26/04/2016.
 */
"use strict";

var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            googleId: DataTypes.STRING,
            googleToken: DataTypes.STRING,
            googleEmail: DataTypes.STRING,
            googleName: DataTypes.STRING,
        },
        {
            classMethods: {
                isValidPassword: function (userPassword,user ) {
                    return new Promise(function (resolve, reject) {
                        bcrypt.compare(userPassword,user.password , function (err, isMatch) {
                            if (err) {
                                reject(new Error(err));
                            }
                            if (isMatch) {
                                resolve({isValid:true,user:user});
                            } else {
                                resolve({isValid:false,user:user});
                            }
                        })
                    });

                }
            }
        });

    User.hook('beforeCreate', function (user,options, fn) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt,null, function (err, hashPassword) {
                if (err) return next(err);
                user.password = hashPassword;
                return fn(null, user);
            });
        });

    });
    return User;
};