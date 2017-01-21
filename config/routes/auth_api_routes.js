/**
 * Created by lengung on 13/06/2016.
 */
var express = require('express');
var router = express.Router();

// Contact
router.get('/contact', require('../../controllers/api/contact_controller').getContact);
router.get('/contacts/group/:groupId', require('../../controllers/api/contact_controller').filterContactByGroup);
router.post('/contact', require('../../controllers/api/contact_controller').createContact);
router.put('/contact/:cid', require('../../controllers/api/contact_controller').updateContact);
router.post('/addContactGroup', require('../../controllers/api/contact_controller').addContactsToGroup);
router.post('/addContactNewGroup', require('../../controllers/api/contact_controller').addContactsToNewGroup);
router.delete('/deleteContacts', require('../../controllers/api/contact_controller').deleteContactsFromGroupsAndContact);
router.delete('/removeContactsFromGroup',require('../../controllers/api/contact_controller').removeContactsFromGroup);

// Group
router.get('/group', require('../../controllers/api/group_controller').getGroup);
router.get('/group/filterByName/:groupName*?', require('../../controllers/api/group_controller').getGroupByName);
router.post('/group', require('../../controllers/api/group_controller').createGroup);

module.exports = router;
