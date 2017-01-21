/**
 * Created by LENG on 15/06/2016.
 */
import axios from "axios";
import {

  IS_ALLOW_ADD_TO_GROUP,
  IS_ALLOW_REMOVE_CONTACT_FROM_GROUP,
  IS_ALLOW_DELETE_CONTACT,
} from "./contact_actions_type";
import {ROOT_URL} from './contact_url';
import loadGroupList from './group_list_load_action'

export default function addContactsToNewGroup(groupName, cb) {
  return (dispatch, getState)=> {
    let contacts = getState().contacts;
    let contactIds = [];
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact.selected) {
        contactIds.push(contact.cid);
      }
    }
    let contactsGroup = {
      contactIds: contactIds,
      group: {name: groupName}
    };
    const request = axios.post(ROOT_URL + 'api/addContactNewGroup', contactsGroup);
    request.then(response=> {
      cb(true, response);
      dispatch(loadGroupList());

      dispatch({
        type: IS_ALLOW_ADD_TO_GROUP,
        payload: {isAllowAddToGroup: false}
      });
      dispatch({
        type: IS_ALLOW_DELETE_CONTACT,
        payload: {isAllow: false}
      });
      dispatch({
        type: IS_ALLOW_REMOVE_CONTACT_FROM_GROUP,
        payload: {isAllow: false}
      });

    }).catch(err=> {
      console.log('Server error:' + err);
      cb(false, err);
    })

  }
}
