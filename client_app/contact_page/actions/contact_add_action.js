/**
 * Created by LENG on 15/06/2016.
 */
import axios from "axios";
import {reset} from "redux-form";
import {SELECT_ALL_CONTACT,ADD_CONTACT} from './contact_actions_type';
import {ROOT_URL} from './contact_url';

export default function addContact(props) {
  var contact = {
    contact: {
      firstName: props.firstName,
      lastName: props.lastName,
      mobile1: props.mobile,
      mobile2: props.mobile2,
      email1: props.email,
      email2: props.email2
    }
  };
  const request = axios.post(ROOT_URL + 'api/contact', contact);
  return (dispatch, getState) => {
    var selectedGroup = getState().selectedGroup.groupType;
    request
      .then(function (response) {
        if (selectedGroup == SELECT_ALL_CONTACT) {
          dispatch({
            type: ADD_CONTACT,
            payload: response
          });
        }
        dispatch(reset('addContact'))
      })
      .catch(function (response) {
        console.log('Server error:' + response);
      });
  }
}
