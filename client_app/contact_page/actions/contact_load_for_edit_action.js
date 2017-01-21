/**
 * Created by LENG on 15/06/2016.
 */
import {LOAD_CONTACT_EDIT} from './contact_actions_type';

export default function loadContactForEdit(contactId) {
  return (dispatch, getState)=> {
    let contacts = getState().contacts;
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact.cid == contactId) {
        dispatch({type: LOAD_CONTACT_EDIT, payload: contact});
        return;
      }
    }
  }

}
