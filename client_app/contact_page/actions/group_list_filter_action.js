/**
 * Created by LENG on 15/06/2016.
 */

import axios from "axios";
import _ from "lodash";
import {
  IS_ALLOW_CREATE_NEW_GROUP,
  FILTER_GROUP,
} from "./contact_actions_type";
import {ROOT_URL} from './contact_url';

export default function filterGroupList(groupName) {
  const request = axios.get(`${ROOT_URL}api/group/filterByName/${groupName}`);
  return function (dispatch) {
    request.then(response=> {

      //Logic to enable create group button
      let isAllow = true;
      if (response.data.length == 0 && _.isEmpty(groupName)) {
        isAllow = false;
      }
      dispatch({
        type: IS_ALLOW_CREATE_NEW_GROUP,
        payload: {isAllow: isAllow}
      });

      for (let i = 0; i < response.data.length; i++) {
        let group = response.data[i];
        if (_.lowerCase(group.name) == _.lowerCase(groupName) || _.isEmpty(groupName)) {
          dispatch({
            type: IS_ALLOW_CREATE_NEW_GROUP,
            payload: {isAllow: false}
          });
          break;
        } else {
          dispatch({
            type: IS_ALLOW_CREATE_NEW_GROUP,
            payload: {isAllow: true}
          });
        }
      }

      //Dispatch Filtered Group List
      dispatch({
        type: FILTER_GROUP,
        payload: response
      })
    }).catch(err=> {
      console.log('Server error:' + err);
    })
  }
}
