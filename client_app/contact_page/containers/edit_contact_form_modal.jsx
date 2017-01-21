/**
 * Created by lengung on 27/03/2016.
 */
import React, {Component,PropTypes} from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentEdit from "material-ui/svg-icons/editor/mode-edit";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import {reduxForm} from "redux-form";
import loadContactForEdit from "../actions/contact_load_for_edit_action";
import updateContact from '../actions/contact_update_action';

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }

    if (!values.email1) {
        errors.email1 = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email1)) {
        errors.email1 = 'Invalid email address';
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email2) && values.email2) {
        errors.email2 = 'Invalid email address';
    }
    if (!values.mobile1) {
        errors.mobile1 = 'Required';
    } else if (isNaN(Number(values.mobile1))) {
        errors.mobile1 = 'Must be a number';
    }
    if (values.mobile2!=null && isNaN(Number(values.mobile2))) {
        errors.mobile2 = 'Must be a number';
    }

    return errors;
};

class EditContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpenState: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpenModal() {
        this.setState({modalOpenState: true});
        this.props.loadContactForEdit(this.props.contactId);

    }

    handleCloseModal() {
        this.setState({modalOpenState: false});
    }

    handleSubmit(props) {
        this.setState({modalOpenState: false});
        this.props.updateContact(props);
    }

    render() {
        const {fields: {firstName, lastName, mobile1, mobile2, email1, email2}, handleSubmit} = this.props;

        return (<div>
                <FloatingActionButton mini={true} secondary={true} onTouchTap={this.handleOpenModal}>
                    <ContentEdit />
                </FloatingActionButton>
                <Dialog
                    title="Edit Contact"
                    modal={false}
                    open={this.state.modalOpenState}
                    onRequestClose={this.handleCloseModal}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                >
                    <div>
                        <form onSubmit={handleSubmit(this.handleSubmit)}>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--6-col">
                                    <TextField
                                        hintText="First Name"
                                        floatingLabelText="First Name"
                                        errorText={firstName.touched && firstName.error ? firstName.error : ''}
                                        {...firstName}
                                    />
                                </div>
                                <div className="mdl-cell mdl-cell--6-col">
                                    <TextField
                                        hintText="Last Name"
                                        floatingLabelText="Last Name"
                                        errorText={lastName.touched && lastName.error ? lastName.error : ''}
                                        {...lastName}
                                    />
                                </div>
                            </div>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--6-col">
                                    <TextField
                                        hintText="Mobile"
                                        floatingLabelText="Mobile"
                                        errorText={mobile1.touched && mobile1.error ? mobile1.error : ''}
                                        {...mobile1}
                                    />
                                </div>
                                <div className="mdl-cell mdl-cell--6-col">
                                    <TextField
                                        hintText="Second Mobile"
                                        floatingLabelText="Second Mobile"
                                        errorText={mobile2.touched && mobile2.error ? mobile2.error : ''}
                                        {...mobile2}
                                    />
                                </div>

                            </div>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--6-col">
                                    <TextField
                                        hintText="Email"
                                        floatingLabelText="Email"
                                        errorText={email1.touched && email1.error ? email1.error : ''}
                                        {...email1}
                                    />
                                </div>
                                <div className="mdl-cell mdl-cell--6-col">
                                    <TextField
                                        hintText="Second Email"
                                        floatingLabelText="Second Email"
                                        errorText={email2.touched && email2.error ? email2.error : ''}
                                        {...email2}
                                    />
                                </div>
                            </div>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col mdl-cell--8-offset">
                                    <div className="pull-right">
                                        <FlatButton
                                            label="Update"
                                            primary={true}
                                            keyboardFocused={true}
                                            type="submit"
                                        />
                                        <FlatButton
                                            label="Cancel"
                                            secondary={true}
                                            onMouseDown={this.handleCloseModal}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Dialog>
            </div >
        );
    }
}
EditContact.propTypes = {
    contactId: PropTypes.string.isRequired,
}

EditContact = reduxForm({
        form: 'editContact',
        fields: ['cid','firstName', 'lastName', 'mobile1', 'mobile2', 'email1', 'email2'],
        validate
    },
    state => (
    { // mapStateToProps
        initialValues: state.contactForEdit.contact
    }),
    {   // mapDispatchToProps
        loadContactForEdit, updateContact
    }
)(EditContact);
export default EditContact;
