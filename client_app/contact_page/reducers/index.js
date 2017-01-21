/**
 * Created by lengung on 25/03/2016.
 */
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import GroupListReducer from './group_list_reducer';
import ContactListReducer from './contact_list_reducer';
import SelectedGroup from './group_selected_reducer';
import FilteredGroupList from './group_list_filtered_reducer';
import allowCreateNewGroup from './is_allow_create_new_group_reducer';
import allowAddToGroup from './is_allow_add_to _group_reducer';
import contactForEdit from './contact_for_edit_reducer';
import  allowRemoveContactFromGroup from './is_allow_remove_contact_from_group_reducer'
import allowDeleteContact from './is_allow_delete_contact_reducer';

const rootReducer=combineReducers({
    groups:GroupListReducer,
    filteredGroups:FilteredGroupList,
    contacts:ContactListReducer,
    selectedGroup:SelectedGroup,
    isAllowCreateGroup:allowCreateNewGroup,
    isAllowAddToGroup:allowAddToGroup,
    isAllowRemoveContactFromGroup: allowRemoveContactFromGroup,
    isAllowDeleteContact:allowDeleteContact,
    contactForEdit:contactForEdit,
    form: formReducer
});

export default rootReducer;
