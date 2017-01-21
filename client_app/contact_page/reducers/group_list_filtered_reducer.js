/**
 * Created by lengung on 21/04/2016.
 */
import {FILTER_GROUP} from '../actions/contact_actions_type';

export default function (state = [], action) {
    switch (action.type) {
        case FILTER_GROUP:
            return Object.assign([], action.payload.data);
        default:
            return state;
    }
}