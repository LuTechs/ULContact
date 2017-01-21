/**
 * Created by lengung on 26/04/2016.
 */

/**
 * Created by lengung on 26/04/2016.
 */

module.exports = function (sequelize, DataTypes) {
    var ContactGroup = sequelize.define("ContactGroup", {
            cgid: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            userId: DataTypes.UUID,
        },
        {
            classMethods: {
                associate: function (models) {

                }
            }
        });

    return ContactGroup;
};