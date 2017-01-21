/**
 * Created by lengung on 5/05/2016.
 */
import {LOAD_CONTACT_EDIT} from '../actions/contact_actions_type' ;
export default function (state = {}, action) {
    switch (action.type) {
        case LOAD_CONTACT_EDIT:
            return {
                contact: action.payload
            }
        default:
            return state
    }
}
