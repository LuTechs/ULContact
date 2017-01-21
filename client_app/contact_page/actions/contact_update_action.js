/**
 * Created by LENG on 15/06/2016.
 */
import axios from "axios";
import {EDIT_CONTACT} from './contact_actions_type';
import {ROOT_URL} from './contact_url';
import {reset} from "redux-form";

export default function updateContact(props) {
  var contact = {
    contact: {
      firstName: props.firstName,
      lastName: props.lastName,
      mobile1: props.mobile1,
      mobile2: props.mobile2,
      email1: props.email1,
      email2: props.email2
    }
  };
  const request = axios.put(ROOT_URL + 'api/contact/' + props.cid, contact);
  return (dispatch) => {
    request
      .then(function (response) {
        dispatch({
          type: EDIT_CONTACT,
          payload: response
        });

        dispatch(reset('editContact'))
      })
      .catch(function (response) {
        console.log('Server error:' + response);
      });
  }
}
