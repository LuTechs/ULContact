import React, {Component,PropTypes} from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentRemove from "material-ui/svg-icons/content/remove-circle";
import WarningIcon from "material-ui/svg-icons/alert/warning";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {deepOrange400} from "material-ui/styles/colors";



class RemoveContactFromGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {modalOpenState: false, isError: false};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleRemoveContact = this.handleRemoveContact.bind(this);
    }

    handleOpenModal() {
        this.setState({modalOpenState: true});

    }

    handleCloseModal() {
        this.setState({modalOpenState: false});
    }

    handleRemoveContact() {
        this.props.onRemoveContactsFromGroup(function (isSuccess) {
            if (isSuccess) {
                this.setState({modalOpenState: false});
            } else {
                this.setState({isError: true});
            }
        }.bind(this));
    }

    render() {
        return (<div style={this.props.style}>
            <FloatingActionButton mini={true} backgroundColor="rgb(64,196,255)"
                                  disabled={!this.props.isAllowRemoveContactFromGroup}
                                  onTouchTap={this.handleOpenModal.bind(this)}>
                <ContentRemove />
            </FloatingActionButton>
            <Dialog
                title="Remove Contacts from selected group"
                modal={false}
                open={this.state.modalOpenState}
                onRequestClose={this.handleCloseModal}
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true}
            >

                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--1-col">
                        <WarningIcon color={deepOrange400} style={{width: '68px', height: '68px'}}/>

                    </div>
                    <div className="mdl-cell mdl-cell--10-col" style={{width: '50%',margin:'20px'}}>
                        Are you sure that you want to remove selected contacts from this group?
                        <p style ={{color:deepOrange400}}>
                            { this.state.isError ?
                                <span
                                    className="label label-danger">Error:Could not remove selected contacts from this group</span> : ''  }
                        </p>
                    </div>
                </div>


                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col mdl-cell--8-offset ">
                        <div className="pull-right">
                            <FlatButton
                                label="Delete"
                                primary={true}
                                onTouchTap={this.handleRemoveContact}
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

RemoveContactFromGroup.propTypes = {
    onRemoveContactsFromGroup:PropTypes.func.isRequired,
    isAllowRemoveContactFromGroup: PropTypes.bool.isRequired,
}
export default RemoveContactFromGroup;
