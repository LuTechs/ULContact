/**
 * Created by lengung on 5/04/2016.
 */

import {SELECT_ALL_CONTACT,SELECT_OTHER_GROUP_CONTACT} from '../actions/contact_actions_type';
export default function (state={groupType:SELECT_ALL_CONTACT} , action) {
    switch (action.type) {
        case SELECT_ALL_CONTACT:
            return Object.assign({},{groupType:action.payload.type,groupId:action.payload.groupId});
            break;
        case SELECT_OTHER_GROUP_CONTACT:
            return Object.assign({},{groupType:action.payload.type,groupId:action.payload.groupId});
            break;
        default:{
            return state;
        }
    }
}