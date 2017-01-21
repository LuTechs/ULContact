/**
 * Created by lengung on 26/03/2016.
 */

import {GET_GROUPS} from '../actions/contact_actions_type';
export default function (state = [], action) {
    switch (action.type) {
        case GET_GROUPS:
            return Object.assign([], action.payload.data);
        default:
            return state;
    }
}