import React, {Component,PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class GroupListInModal extends Component {
    constructor(props) {
        super(props);
        this.state={groupName:''};
        this.onGroupNameChangeHandler=this.onGroupNameChangeHandler.bind(this);
        this.renderGroup=this.renderGroup.bind(this);
        this.onClickCreateGroupHandler=this.onClickCreateGroupHandler.bind(this);
    }

    onGroupNameChangeHandler(event){
        this.setState({groupName:event.target.value});
        this.props.onGroupNameChange(event.target.value);
    }

    onSelectedExistingGroupHandler(groupId){
        this.props.onSelectExistingGroup(groupId);
    }

    onClickCreateGroupHandler(){
        this.props.onClickCreateGroup(this.state.groupName);
    }

    renderGroup(group) {
        const key=group.gid;
        const name=group.name;
        return (
            <tr key={key}  >
                <td>
                    {name}
                </td>
                <td>
                    <RaisedButton
                        primary={true}
                        label="Select"
                        onClick={this.onSelectedExistingGroupHandler.bind(this,key)}
                    />
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Search or Create Group"
                    onChange={this.onGroupNameChangeHandler}

                />
                <RaisedButton secondary={true}
                              label="Creat New Group"
                              disabled={!this.props.isAllowCreateGroup}
                              onTouchTap={this.onClickCreateGroupHandler}
                />

                <table className="mdl-data-table mdl-data-table--selectable mdl-shadow--2dp full-width">
                    <thead>
                    <tr>
                        <th>Group</th>
                        <th>Select</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.filteredGroups.map(this.renderGroup)}
                    </tbody>
                </table>
            </div>
        );
    }
}
GroupListInModal.propTypes = {
    filteredGroups: PropTypes.array.isRequired,
    onGroupNameChange:PropTypes.func.isRequired,
    isAllowCreateGroup:PropTypes.bool.isRequired,
    onSelectExistingGroup:PropTypes.func.isRequired,
    onClickCreateGroup:PropTypes.func.isRequired
}

export default GroupListInModal;
