/**
 * Created by LENG on 15/06/2016.
 */
import axios from "axios";
import {GET_CONTACTS} from './contact_actions_type';
import {ROOT_URL} from './contact_url';

export default function loadContactList() {
  const request = axios.get(ROOT_URL + 'api/contact');
  return {
    type: GET_CONTACTS,
    payload: request
  }
}
