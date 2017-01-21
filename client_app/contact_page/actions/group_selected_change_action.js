/**
 * Created by LENG on 15/06/2016.
 */
export default function groupSelectedChange(groupType, groupId) {
  return {
    type: groupType,
    payload:{type:groupType,groupId:groupId}
  }
}
