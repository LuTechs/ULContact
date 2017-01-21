/**
 * Created by LENG on 15/06/2016.
 */

import axios from "axios";
import {
  IS_ALLOW_ADD_TO_GROUP,
  IS_ALLOW_REMOVE_CONTACT_FROM_GROUP,
} from "./contact_actions_type";
import filterContactByGroup from './contact_filter_by_group_action';
import {ROOT_URL} from './contact_url';


export default function removeContactsFromGroup(cb) {

  return ((dispatch, getState)=> {
    let contacts = getState().contacts;
    let groupId = getState().selectedGroup.groupId;
    let contactIds = [];
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact.selected) {
        contactIds.push(contact.cid);
      }
    }
    let contactsGroup = {
      contactIds: contactIds,
      groupId: groupId
    };
    const request = axios.delete(ROOT_URL + 'api/removeContactsFromGroup', {data: contactsGroup});
    request.then(response=> {
      cb(true, response);

      dispatch(filterContactByGroup(groupId));
      dispatch({
        type: IS_ALLOW_REMOVE_CONTACT_FROM_GROUP,
        payload: {isAllow: false}
      });
      dispatch({
        type: IS_ALLOW_ADD_TO_GROUP,
        payload: {isAllowAddToGroup: false}
      });

    }).catch(err=> {

      console.log('Server error:');
      console.log(err);
      cb(false, err);
    })
  });

}

