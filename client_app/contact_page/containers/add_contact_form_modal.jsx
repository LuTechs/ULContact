/**
 * Created by lengung on 27/03/2016.
 */
import React, {Component} from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import {reduxForm} from "redux-form";
import addContact from "../actions/contact_add_action";


const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email2) && values.email2) {
        errors.email2 = 'Invalid email address';
    }
    if (!values.mobile) {
        errors.mobile = 'Required';
    } else if (isNaN(Number(values.mobile))) {
        errors.mobile = 'Must be a number';
    }

    if (values.mobile2!=null && isNaN(Number(values.mobile2))) {
        errors.mobile2 = 'Must be a number';
    }


    return errors;
};

class AddContact extends Component {

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

    }

    handleCloseModal() {
        this.setState({modalOpenState: false});
    }

    handleSubmit(props) {
        this.props.addContact(props);
        this.setState({modalOpenState: false});
    }

    render() {
        const {fields: {firstName, lastName, mobile, mobile2, email, email2}, handleSubmit} = this.props;

        return (<div style={this.props.style}>
                <FloatingActionButton mini={true} onTouchTap={this.handleOpenModal}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title="Create New Contact"
                    modal={false}
                    open={this.state.modalOpenState}
                    onRequestClose={this.handleCloseModal}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                >
                    <div >
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
                                        errorText={mobile.touched && mobile.error ? mobile.error : ''}
                                        {...mobile}
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
                                        errorText={email.touched && email.error ? email.error : ''}
                                        {...email}
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
                                <div className="mdl-cell mdl-cell--12-col mdl-cell--8-offset ">
                                    <div className="pull-right">
                                        <FlatButton
                                            label="Submit"
                                            primary={true}
                                            keyboardFocused={true}
                                            type="submit"
                                            onTouchTap={this.submitFormTest}
                                        />
                                        <FlatButton
                                            label="Cancel"
                                            secondary={true}
                                            onTouchTap={this.handleCloseModal}
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

AddContact = reduxForm({
    form: 'addContact',
    fields: ['firstName', 'lastName', 'mobile', 'mobile2', 'email', 'email2'],
    validate
}, null, {addContact})(AddContact);
export default AddContact;
