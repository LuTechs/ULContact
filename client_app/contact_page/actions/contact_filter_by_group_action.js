/**
 * Created by LENG on 15/06/2016.
 */
import axios from "axios";
import {FILTER_CONTACT,IS_ALLOW_ADD_TO_GROUP,IS_ALLOW_DELETE_CONTACT,IS_ALLOW_REMOVE_CONTACT_FROM_GROUP} from './contact_actions_type'
import {ROOT_URL} from './contact_url';

export default function filterContactByGroup(groupId) {
  const request = axios.get(ROOT_URL + 'api/contacts/group/' + groupId);
  return function (dispatch) {
    request
      .then(function (response) {
        dispatch({
          type: FILTER_CONTACT,
          payload: response
        });
        dispatch({
          type: IS_ALLOW_ADD_TO_GROUP,
          payload: {isAllowAddToGroup: false}
        });
        dispatch({
          type:IS_ALLOW_DELETE_CONTACT,
          payload:{isAllow:false}
        });
        dispatch({
          type:IS_ALLOW_REMOVE_CONTACT_FROM_GROUP,
          payload:{isAllow:false}
        });

      })
      .catch(function (response) {
        console.log('Server error:' + response);
      });
  };
}
