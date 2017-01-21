import React, {Component, PropTypes} from "react";
import {List, ListItem, makeSelectable} from "material-ui/List";
import ContactIcon from "material-ui/svg-icons/communication/contacts";
import GroupIcon from "material-ui/svg-icons/social/group";
import Avatar from 'material-ui/Avatar';
import {blue500,yellow600} from 'material-ui/styles/colors';
import Subheader from "material-ui/Subheader";
let SelectableList = makeSelectable(List);


class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedIndex: 0};
        this.renderGroup = this.renderGroup.bind(this);
    }

    handlerFilterContactByGroup(groupId, isDefault, index) {
        this.props.onSelectGroup(groupId, isDefault);
        this.setState({
            selectedIndex: index
        });

    }


    renderGroup(group, index) {
        const key = group.gid;
        const name = group.name;
        const isDefault = group.default;
        if(isDefault){
            return (
                <ListItem value={index} key={key} primaryText={name}
                          leftAvatar={<Avatar icon={<ContactIcon />} backgroundColor={blue500} />}
                          onClick={this.handlerFilterContactByGroup.bind(this, key,isDefault,index)}/>
            );
        }else{
            return (
                <ListItem value={index} key={key} primaryText={name}
                          leftAvatar={<Avatar icon={<GroupIcon />} backgroundColor={yellow600} />}
                          onClick={this.handlerFilterContactByGroup.bind(this, key,isDefault,index)}/>
            );
        }
    }

    render() {
        return (
            <SelectableList value={this.state.selectedIndex}>
                <Subheader>Contact Groups</Subheader>
                {this.props.groups.map(this.renderGroup)}
            </SelectableList>
        );
    }
}
GroupList.propTypes = {
    groups: PropTypes.array.isRequired,
    onSelectGroup: PropTypes.func.isRequired
}


export default GroupList;
