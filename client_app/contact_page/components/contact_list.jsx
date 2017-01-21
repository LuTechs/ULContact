import React, {Component, PropTypes} from 'react';
import EditContactButton from '../containers/edit_contact_form_modal';
class ContactList extends Component {
  constructor(props) {
    super(props);
    this.renderContact = this.renderContact.bind(this);

  }

  onRowClickHandler(contactId, event) {
    this.props.onSelectContact(contactId);
  }


  renderContact(contact) {
    const key = contact.cid;
    const firstName = contact.firstName;
    const lastName = contact.lastName;
    const mobile1 = contact.mobile1;
    const mobile2 = contact.mobile2;
    const email1 = contact.email1;
    const email2 = contact.email2;
    return (
      <tr key={key} className={contact.selected?"is-selected":''}>
        <td className="col-sm-1" onClick={this.onRowClickHandler.bind(this,key)}>
          <input type="checkbox" checked={contact.selected?'checked':''}/>
        </td>
        <td className="col-sm-4"
            onClick={this.onRowClickHandler.bind(this,key)}>{firstName + ' ' + lastName}</td>
        <td className="col-sm-4" onClick={this.onRowClickHandler.bind(this,key)}>
          <ul className="mdl-list">
            <li>{mobile1}</li>
            <li>{mobile2}</li>
          </ul>
        </td>
        <td className="col-sm-3" onClick={this.onRowClickHandler.bind(this,key)}>
          <ul className="mdl-list">
            <li>{email1}</li>
            <li>{email2}</li>
          </ul>
        </td>
        <td>
          <EditContactButton contactId={key}/>
        </td>

      </tr>
    );
  }

  render() {
    return (
      <table className="mdl-data-table mdl-data-table--selectable mdl-shadow--2dp full-width">
        <thead>
        <tr>
          <th ></th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {this.props.contacts.map(this.renderContact)}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onSelectContact: PropTypes.func.isRequired,
}


export default ContactList;
