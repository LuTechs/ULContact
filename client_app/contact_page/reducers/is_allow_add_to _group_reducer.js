/**
 * Created by lengung on 24/04/2016.
 */
import {IS_ALLOW_ADD_TO_GROUP} from '../actions/contact_actions_type';
export default function (state=false , action) {
    switch (action.type) {
        case IS_ALLOW_ADD_TO_GROUP:
            return action.payload.isAllowAddToGroup;
            break;
        default:{
            return state;
        }
    }
}