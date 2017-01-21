import React, {Component, PropTypes} from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentDelete from "material-ui/svg-icons/action/delete";
import WarningIcon from "material-ui/svg-icons/alert/warning";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {red500} from "material-ui/styles/colors";

class DeleteContact extends Component {
    constructor(props) {
        super(props)
        this.state = {modalOpenState: false, isError: false};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDeleteContact = this.handleDeleteContact.bind(this);
    }

    handleOpenModal() {
        this.setState({modalOpenState: true});

    }

    handleCloseModal() {
        this.setState({modalOpenState: false});
    }

    handleDeleteContact() {
        this.props.onDeleteContactAndRemoveFromGroups(function (isSuccess) {
            if (isSuccess) {
                this.setState({modalOpenState: false});
            } else {
                this.setState({isError: true});
            }
        }.bind(this));
    }

    render() {
        return (<div style={this.props.style}>
            <FloatingActionButton mini={true} backgroundColor="rgb(255,82,82)"
                                  disabled={!this.props.isAllowDeleteContact}
                                  onTouchTap={this.handleOpenModal.bind(this)}>
                <ContentDelete />
            </FloatingActionButton>
            <Dialog
                title="Delete Contacts"
                modal={false}
                open={this.state.modalOpenState}
                onRequestClose={this.handleCloseModal}
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true}
            >

                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--1-col">
                        <WarningIcon color={red500} style={{width: '68px', height: '68px'}}/>

                    </div>
                    <div className="mdl-cell mdl-cell--10-col" style={{width: '50%',margin:'20px'}}>
                        Are you sure that you want to delete selected contacts?
                        <p style ={{color:red500}}>
                            { this.state.isError ?
                                <span
                                    className="label label-danger">Error:Could not delete selected contacts</span> : ''  }
                        </p>
                    </div>
                </div>


                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col mdl-cell--8-offset ">
                        <div className="pull-right">
                            <FlatButton
                                label="Delete"
                                primary={true}
                                onTouchTap={this.handleDeleteContact}
                            />
                            <FlatButton
                                label="Cancel"
                                secondary={true}
                                keyboardFocused={true}
                                onTouchTap={this.handleCloseModal}
                            />
                        </div>
                    </div>
                </div>

            </Dialog>
        </div>);
    }

}
DeleteContact.propTypes = {
    onDeleteContactAndRemoveFromGroups: PropTypes.func.isRequired,
    isAllowDeleteContact: PropTypes.bool.isRequired,
}
export default DeleteContact;
