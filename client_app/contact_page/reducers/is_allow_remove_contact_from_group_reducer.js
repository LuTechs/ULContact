/**
 * Created by lengung on 20/05/2016.
 */

import {IS_ALLOW_REMOVE_CONTACT_FROM_GROUP} from '../actions/contact_actions_type';
export default function (state=false , action) {
    switch (action.type) {
        case IS_ALLOW_REMOVE_CONTACT_FROM_GROUP:
            return action.payload.isAllow;
            break;
        default:{
            return state;
        }
    }
}