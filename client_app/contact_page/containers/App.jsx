import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import GroupList from "../components/group_list";
import ContactList from "../components/contact_list";
import AddContact from "./add_contact_form_modal";
import AddContactToGroup from "../components/add_contact_to_group";
import DeleteContact from "../components/delete_contact";
import RemoveContactFromGroup from "../components/remove_contact_from_group";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import removeContactsFromGroup from '../actions/contacts_remove_from_group_action';
import selectContact from '../actions/contact_select_action';
import loadGroupList from '../actions/group_list_load_action';
import loadContactList from '../actions/contact_list_load_action';
import filterContactByGroup from '../actions/contact_filter_by_group_action';
import groupSelectedChange from '../actions/group_selected_change_action';
import filterGroupList from '../actions/group_list_filter_action';
import addContactsToExistingGroup from '../actions/contacts_add_to_existing _group_action';
import addContactsToNewGroup from '../actions/contacts_add_to_new_group_action';
import deleteContactAndRemoveFromGroups from '../actions/contact_delete_and_remove_from_group_action';
import {SELECT_ALL_CONTACT, SELECT_OTHER_GROUP_CONTACT} from "../actions/contact_actions_type";

const styles = {
  paddingLeft: 6,
  paddingRight: 6
};
class App extends Component {
  constructor(props) {
    super(props);
    this.onSelectContactHandler = this.onSelectContactHandler.bind(this);
    this.onSelectGroupHandler = this.onSelectGroupHandler.bind(this);
    this.onGroupNameChangeHandler = this.onGroupNameChangeHandler.bind(this);
    this.onSelectExistingGroupHandler = this.onSelectExistingGroupHandler.bind(this);
    this.onClickCreateGroupHandler = this.onClickCreateGroupHandler.bind(this);
    this.onDeleteContactHandler = this.onDeleteContactHandler.bind(this);
    this.onRemoveContactsFromGroupHandler = this.onRemoveContactsFromGroupHandler.bind(this);
    this.props.actions.loadContactList();
    this.props.actions.loadGroupList();
  }

  onSelectContactHandler(contactId) {
    this.props.actions.selectContact(contactId);

  }

  onSelectGroupHandler(groupId, isDefault) {
    this.props.actions.filterContactByGroup(groupId);
    if (isDefault) {
      this.props.actions.changeSelectedGroup(SELECT_ALL_CONTACT, groupId);
    } else {
      this.props.actions.changeSelectedGroup(SELECT_OTHER_GROUP_CONTACT, groupId);
    }
  }

  onGroupNameChangeHandler(groupName) {
    this.props.actions.filterGroupList(groupName);
  }

  onSelectExistingGroupHandler(groupId, cb) {
    this.props.actions.addContactsToExistingGroup(groupId, cb);
  }

  onClickCreateGroupHandler(groupName, cb) {
    this.props.actions.addContactsToNewGroup(groupName, cb)
  }

  onDeleteContactHandler(cb) {
    this.props.actions.deleteContactAndRemoveFromGroups(cb);
  }

  onRemoveContactsFromGroupHandler(cb) {
    this.props.actions.removeContactsFromGroup(cb);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--2-col">
            <GroupList
              groups={this.props.groups}
              onSelectGroup={this.onSelectGroupHandler}/>
          </div>
          <div className="mdl-cell mdl-cell--10-col">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col mdl-cell--9-offset">
                <nav className="mdl-navigation">
                  <DeleteContact style={styles}
                                 isAllowDeleteContact={this.props.isAllowDeleteContact}
                                 onDeleteContactAndRemoveFromGroups={this.onDeleteContactHandler}/>

                  <RemoveContactFromGroup style={styles}
                                          isAllowRemoveContactFromGroup={this.props.isAllowRemoveContactFromGroup}
                                          onRemoveContactsFromGroup={this.onRemoveContactsFromGroupHandler}/>
                  <AddContactToGroup
                    style={styles}
                    filteredGroups={this.props.filteredGroups}
                    onGroupNameChange={this.onGroupNameChangeHandler}
                    isAllowCreateGroup={this.props.isAllowCreateGroup}
                    isAllowAddToGroup={this.props.isAllowAddToGroup}
                    onSelectExistingGroup={this.onSelectExistingGroupHandler}
                    onClickCreateGroup={this.onClickCreateGroupHandler}
                  />
                  <AddContact style={styles}/>
                </nav>
              </div>
            </div>
            <div className="mdl-grid--no-spacing">
              <div className="mdl-cell mdl-cell--12-col">
                <ContactList
                  contacts={this.props.contacts}
                  onSelectContact={this.onSelectContactHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
function mapStateToProps({
  groups, filteredGroups, contacts, isAllowCreateGroup, isAllowAddToGroup,
  isAllowRemoveContactFromGroup, isAllowDeleteContact
}) {

  return {
    groups, filteredGroups, contacts, isAllowCreateGroup, isAllowAddToGroup,
    isAllowRemoveContactFromGroup, isAllowDeleteContact
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadContactList: bindActionCreators(loadContactList, dispatch),
      selectContact: bindActionCreators(selectContact, dispatch),
      loadGroupList: bindActionCreators(loadGroupList, dispatch),
      filterContactByGroup: bindActionCreators(filterContactByGroup, dispatch),
      changeSelectedGroup: bindActionCreators(groupSelectedChange, dispatch),
      filterGroupList: bindActionCreators(filterGroupList, dispatch),
      addContactsToExistingGroup: bindActionCreators(addContactsToExistingGroup, dispatch),
      addContactsToNewGroup: bindActionCreators(addContactsToNewGroup, dispatch),
      deleteContactAndRemoveFromGroups: bindActionCreators(deleteContactAndRemoveFromGroups, dispatch),
      removeContactsFromGroup: bindActionCreators(removeContactsFromGroup, dispatch),
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
