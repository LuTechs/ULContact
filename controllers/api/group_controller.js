/**
 * Created by lengung on 26/03/2016.
 */
var _ = require('lodash');
var Model = require('../../models/index');

exports.getGroup = function (req, res, next) {
    Model.Group
        .findAll({
            order: ' "name" ASC',
            where: {userId: req.user.id}
        })
        .then(groups=> {
            res.status(200).json(groups);
        })
        .catch(err=> {
            res.status(500).json({message: err});
        });

}

exports.getGroupByName = function (req, res, next) {
    var groupName = req.params.groupName;
    if (_.isUndefined(groupName)) {
        res.status(200).json([]);
        return;
    }
    Model.Group
        .findAll({
            where: {
                name: {
                    $like: `${groupName}%`
                },
                $and: {userId: req.user.id}
            }
        })
        .then(groups=> {
            res.status(200).json(groups);
        })
        .catch(err=> {
            res.status(500).json({message: err});
        });

}

exports.createGroup = function (req, res, next) {
    var group = req.body.group;
    group.userId = req.user.id;
    Model.Group.create(group)
        .then(group => {
            res.status(200).json(group);
        })
        .catch(err=> {
            res.status(500).json({message: err});
        });

}
