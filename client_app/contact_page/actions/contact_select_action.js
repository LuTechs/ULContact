/**
 * Created by LENG on 15/06/2016.
 */

import {
  SELECT_ALL_CONTACT,
  IS_ALLOW_ADD_TO_GROUP,
  IS_ALLOW_REMOVE_CONTACT_FROM_GROUP,
  IS_ALLOW_DELETE_CONTACT,
  SELECT_CONTACT,
} from "./contact_actions_type";


export default function selectContact(contactId) {
  return (dispatch, getState) => {
    let contacts = getState().contacts;
    let selectedGroup = getState().selectedGroup.groupType;
    let isAllowAddToGroup = false;

    //Check a least  contact is selected in order to enable below buttons
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact.cid == contactId && (!contact.selected)) {
        isAllowAddToGroup = true;
        break;
      } else if (contact.cid != contactId && contact.selected) {
        isAllowAddToGroup = true;
        break;
      }
      else {
        isAllowAddToGroup = false;
      }
    }

    let isAllowDeleteContact = false;
    let isAllowRemoveContactFromGroup = false;

    //Enable or Disable RemoveContactFromGroup or  Delete ContactFromGroup
    if (isAllowAddToGroup) {
      if (selectedGroup == SELECT_ALL_CONTACT) {
        //dispatch enable  delete contact button  but disable remove contact button
        isAllowDeleteContact = true;
        isAllowRemoveContactFromGroup = false;

      } else {
        //dispatch enable  remove contact button  but disable delete contact button
        isAllowDeleteContact = false;
        isAllowRemoveContactFromGroup = true;

      }

    } else {
      //disable both
      isAllowDeleteContact = false;
      isAllowRemoveContactFromGroup = false;
    }

    dispatch({
      type: IS_ALLOW_REMOVE_CONTACT_FROM_GROUP,
      payload: {isAllow: isAllowRemoveContactFromGroup}
    });

    dispatch({
      type: IS_ALLOW_DELETE_CONTACT,
      payload: {isAllow: isAllowDeleteContact}
    });


    //Enable or Disable AddContactToGroup
    dispatch({
      type: IS_ALLOW_ADD_TO_GROUP,
      payload: {isAllowAddToGroup: isAllowAddToGroup}
    });

    //Update selected contact state
    dispatch({
      type: SELECT_CONTACT,
      payload: {selectedContactId: contactId}
    });
  }

}
