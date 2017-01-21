/**
 * Created by LENG on 22/04/2016.
 */

import {IS_ALLOW_CREATE_NEW_GROUP} from '../actions/contact_actions_type';
export default function (state=false , action) {
    switch (action.type) {
        case IS_ALLOW_CREATE_NEW_GROUP:
            return action.payload.isAllow;
            break;
        default:{
            return state;
        }
    }
}