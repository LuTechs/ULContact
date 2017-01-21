/**
 * Created by lengung on 26/04/2016.
 */

module.exports = function (sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
            gid: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            name: DataTypes.STRING,
            default:DataTypes.BOOLEAN,
            userId: DataTypes.UUID

        },
        {
            classMethods: {
                associate: function (models) {
                    Group.hasMany(models.ContactGroup, {foreignKey: 'group_id'});
                }
            }
        });

    return Group;
};