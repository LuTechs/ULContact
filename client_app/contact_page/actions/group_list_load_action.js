/**
 * Created by LENG on 15/06/2016.
 */
import axios from "axios";
import  {GET_GROUPS} from './contact_actions_type';
import {ROOT_URL} from './contact_url';

export default function loadGroupList() {
  const request = axios.get(ROOT_URL + 'api/group');
  return {
    type: GET_GROUPS,
    payload: request
  };

}
