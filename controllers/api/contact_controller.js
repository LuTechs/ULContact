/**
 * Created by lengung on 25/03/2016.
 */
var _ = require('lodash');
var Promise = require("bluebird");
var Model = require('../../models/index');

exports.getContact = function (req, res, next) {
    Model.Contact
        .findAll({
            raw: true,
            order: ' "firstName" asc',
            where: {
                userId: req.user.id
            }
        })
        .then(function (contacts) {
            return Promise.map(contacts, function (contact) {
                return Object.assign({}, contact, {selected: false});
            })
        })
        .then(function (newContacts) {
            res.status(200).json(newContacts);
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({message: err});
        });
}

exports.createContact = function (req, res, next) {
    var contact = req.body.contact;
    var userId = req.user.id;
    var groupId;
    var newCreatedContact;
    contact.userId = userId;
    if (_.isEmpty(contact.email2)) {
        contact.email2 = null;
    }

    Model.sequelize.transaction(function (t) {
        return Model.Group.findOne({
                where: {
                    default: true,
                    $and: {userId: userId}
                }
            },
            {transaction: t}
        ).then(function (group) {
            groupId = group.gid
            return Model.Contact.create(contact, {transaction: t});

        }).then(function (createdContact) {
            newCreatedContact = createdContact;
            return Model.ContactGroup.create({
                contact_id: createdContact.cid,
                group_id: groupId,
                userId: userId
            }, {transaction: t})

        })

    }).then(function (createdcontactGroup) {
        res.status(200).json(newCreatedContact);
    }).catch(err=> {
        console.log(err);
        res.status(500).send(err);
    });

}

exports.updateContact = function (req, res, next) {
    var contact = req.body.contact;
    if (_.isEmpty(contact.email2)) {
        contact.email2 = null;
    }
    var cid = req.params.cid;
    var conditions = {where: {cid: cid}};
    Model.sequelize.transaction(function (t) {
        return Model.Contact
            .update(contact, conditions, {transaction: t})
            .then(function () {
                return Model.Contact.find(conditions, {transaction: t})
            })

    }).then(function (updatedContact) {
        res.status(200).json(updatedContact);

    }).catch(function (err) {
        console.log(err);
        res.status(500).json({message: err});
    });


}

exports.addContactsToGroup = function (req, res, next) {

    var contactIds = req.body.contactIds;
    var groupId = req.body.groupId;
    var userId = req.user.id;
    Model.sequelize.transaction(function (t) {
        return Model.ContactGroup
            .findAll({
                raw: true,
                attributes: ['contact_id', 'group_id'],
                where: {
                    contact_id: contactIds,
                    $and: {group_id: groupId, userId: userId},
                },
                transaction: t
            })
            .then(function (contactGroups) {
                if (contactGroups.length <= 0) {
                    return Promise.map(contactIds, function (contactId) {
                        return Object.assign({}, {contact_id: contactId, group_id: groupId, userId: userId});
                    });
                } else {
                    var newContactGroups = [];
                    for (var j = 0; j < contactIds.length; j++) {
                        var isContactExistInGroup = false;
                        for (var i = 0; i < contactGroups.length; i++) {
                            var contactGroup = contactGroups[i];
                            if (contactGroup.contact_id != contactIds[j]) {
                                isContactExistInGroup = true;
                            }
                        }
                        if (!isContactExistInGroup) {
                            return newContactGroups.push({
                                contact_id: contactIds[j],
                                group_id: groupId,
                                userId: userId
                            });
                        }
                    }
                    return newContactGroups;
                }
            })
            .then(function (contactGroups) {
                return Model.ContactGroup.bulkCreate(contactGroups, {transaction: t});
            });
    }).then(function (newContactGroups) {
        res.json({message: 'contacts has added to group'});
    }).catch(err=> {
        console.log(err);
        res.status(500).send(err);
    });
}

exports.addContactsToNewGroup = function (req, res, next) {
    var group = req.body.group;
    var contactIds = req.body.contactIds;
    var userId = req.user.id;
    group.userId = userId;
    group.default = false;
    Model.sequelize.transaction(function (t) {
        return Model.Group.create(group,{transaction: t})
            .then(newGroup => {
                var groupId = newGroup.gid;
                return Promise.map(contactIds, function (contactId) {
                    return Object.assign({}, {contact_id: contactId, group_id: groupId, userId: userId});
                });

            })
            .then(contactGroups=> {
                return Model.ContactGroup.bulkCreate(contactGroups,{transaction: t});
            })

    }).then(function (newContactGroups) {
        res.json({message: 'contacts has added to new group'});
    }).catch(err=> {
        res.status(500).json({message: err});
    });

}

exports.filterContactByGroup = function (req, res, next) {
    var groupId = req.params.groupId;
    var userId = req.user.id;
    Model.ContactGroup
        .findAll({
            raw: true,
            attributes: ['contact_id'],
            where: {
                group_id: groupId,
                $and: {userId: userId}
            }
        })
        .then(function (contactGroups) {
                return Promise.map(contactGroups, function (contactGroup) {
                    return contactGroup.contact_id;
                });
            }
        ).then(function (contactIds) {
        return Model.Contact.findAll(
            {
                raw: true,
                order: ' "firstName" asc',
                where: {
                    cid: contactIds
                }
            });
    })
        .then(function (contacts) {
            res.status(200).json(contacts);
        })
        .catch(err=> {
            console.log(err);
            res.status(500).send(err);
        });


}

exports.deleteContactsFromGroupsAndContact = function (req, res, next) {
    var contactIds = req.body.contactIds;
    var userId = req.user.id;
    Model.sequelize.transaction()
        .then(function (t) {
            return Model.ContactGroup
                .destroy({
                        where: {
                            contact_id: contactIds,
                            $and: {userId: userId}
                        },
                        transaction: t
                    }
                )
                .then(affectedRowsWhenDeleteContactGroup=> {
                    //at least one row affected
                    if (affectedRowsWhenDeleteContactGroup > 0) {
                        return Model.Contact.destroy({
                            where: {
                                cid: contactIds,
                                $and: {userId: userId}
                            },
                            transaction: t
                        });
                    }
                })
                .then(function (affectedRowsWhenDeleteContact) {
                    return t.commit();
                })
                .then(function () {
                    res.status(200).json({messsage: 'selected contacts has been delete and remove from all groups'});
                })
                .catch(err=> {
                    console.log(err);
                    res.status(500).json({message: 'server eror contact your administrator'});
                    return t.rollback();
                });
        });
}

exports.removeContactsFromGroup = function (req, res, next) {
    var contactIds = req.body.contactIds;
    var groupId=req.body.groupId;
    var userId = req.user.id;
    Model.sequelize.transaction()
        .then(function (t) {
            return Model.ContactGroup
                .destroy({
                        where: {
                            contact_id: contactIds,
                            userId: userId,
                            group_id:groupId,
                        },
                        transaction: t
                    }
                )
                .then(function (affectedRowsWhenRemoveContactsFromGroup) {
                    return t.commit();
                })
                .then(function () {
                    res.status(200).json({messsage: 'selected contacts has been delete and remove from all groups'});
                })
                .catch(err=> {
                    console.log(err);
                    res.status(500).json({message: 'server eror contact your administrator'});
                    return t.rollback();
                });
        });
}






