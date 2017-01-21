/**
 * Created by lengung on 26/03/2016.
 */

import {GET_CONTACTS, ADD_CONTACT, FILTER_CONTACT, EDIT_CONTACT, SELECT_CONTACT} from "../actions/contact_actions_type";
export default function (state = [], action) {
    switch (action.type) {
        case GET_CONTACTS:
            return Object.assign([], action.payload.data);
            break;
        case  ADD_CONTACT:
            return state.concat(action.payload.data);
            break;
        case EDIT_CONTACT:
            var newState = state.map(contact => {
                return contact.cid == action.payload.data.cid ?
                    Object.assign({}, contact, action.payload.data) :
                    contact
            });

            return newState;
            break;
        case FILTER_CONTACT:
            return Object.assign([], action.payload.data);
            break;
        case SELECT_CONTACT:
            var newState = state.map(contact => {
                return contact.cid == action.payload.selectedContactId ?
                    Object.assign({}, contact, {selected: !contact.selected}) :
                    contact
            });

            return newState;
            break;

        default:
            return state;
    }
}