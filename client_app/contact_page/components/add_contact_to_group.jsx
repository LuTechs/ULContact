import React, {Component, PropTypes} from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import GroupAdd from "material-ui/svg-icons/social/group-add";
import Dialog from "material-ui/Dialog";
import GroupListInModal from './group_list_in_modal';

const customContentStyle = {
    width: '40%',
    maxWidth: 'none',
};

class AddContactToGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {modalOpenState: false,isError:false};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.onSelectExistingGroupHandler = this.onSelectExistingGroupHandler.bind(this);
        this.onClickCreateGroupHandler=this.onClickCreateGroupHandler.bind(this);
    }

    handleOpenModal() {
        this.setState({modalOpenState: true});

    }

    handleCloseModal() {
        this.setState({modalOpenState: false});
    }

    onSelectExistingGroupHandler(groupId) {
        this.props.onSelectExistingGroup(groupId,
            function (isSuccess,response) {
                if (isSuccess) {
                    this.setState({modalOpenState: false});
                } else{
                    this.setState({isError:true});
                }
            }.bind(this)
        );
    }

    onClickCreateGroupHandler(groupName){
        this.props.onClickCreateGroup(groupName,function (isSuccess) {
            if (isSuccess) {
                this.setState({modalOpenState: false});
            } else{
                this.setState({isError:true});
            }
        }.bind(this));
    }

    render() {
        return (
            <div style={this.props.style}>
                <FloatingActionButton disabled={!this.props.isAllowAddToGroup}
                                      mini={true}
                                      secondary={true}
                                      onTouchTap={this.handleOpenModal.bind(this)}>
                    <GroupAdd/>
                </FloatingActionButton>
                <Dialog
                    title="Contact Group"
                    modal={false}
                    open={this.state.modalOpenState}
                    onRequestClose={this.handleCloseModal}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    contentStyle={customContentStyle}

                >
                    { this.state.isError? <span className="label label-danger">Error:Could not add contact to group</span>:''  }
                    <GroupListInModal
                        filteredGroups={this.props.filteredGroups}
                        onGroupNameChange={value=>this.props.onGroupNameChange(value)}
                        isAllowCreateGroup={this.props.isAllowCreateGroup}
                        onSelectExistingGroup={this.onSelectExistingGroupHandler}
                        onClickCreateGroup={this.onClickCreateGroupHandler}
                    />

                </Dialog>
            </div>
        );

    }
}

AddContactToGroup.propTypes = {
    filteredGroups: PropTypes.array.isRequired,
    onGroupNameChange: PropTypes.func.isRequired,
    isAllowCreateGroup: PropTypes.bool.isRequired,
    isAllowAddToGroup: PropTypes.bool.isRequired,
    onSelectExistingGroup: PropTypes.func.isRequired,
    onClickCreateGroup:PropTypes.func.isRequired,
}

export default AddContactToGroup;
