/**
 * Created by LENG on 15/06/2016.
 */
import axios from "axios";
import {
  IS_ALLOW_ADD_TO_GROUP,
  IS_ALLOW_DELETE_CONTACT,

} from "./contact_actions_type";
import loadContactList from './contact_list_load_action';
import {ROOT_URL} from './contact_url';

export default function deleteContactAndRemoveFromGroups(cb) {
  return ((dispatch, getState)=> {
    let contacts = getState().contacts;
    let contactIds = [];
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact.selected) {
        contactIds.push(contact.cid);
      }
    }

    const request = axios.delete(ROOT_URL + 'api/deleteContacts', {data: {contactIds: contactIds}});
    request.then(response=> {
      cb(true, response);
      dispatch(loadContactList());
      dispatch({
        type: IS_ALLOW_DELETE_CONTACT,
        payload: {isAllow: false}
      });
      dispatch({
        type: IS_ALLOW_ADD_TO_GROUP,
        payload: {isAllowAddToGroup: false}
      });

    }).catch(err=> {
      console.log('Server error:' + err);
      cb(false, err);
    })
  });
}
