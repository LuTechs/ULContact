/**
 * Created by lengung on 26/04/2016.
 */

module.exports = function (sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
            cid: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            mobile1: DataTypes.STRING,
            mobile2: DataTypes.STRING,
            email1: {
                type: DataTypes.STRING,
                validate: {isEmail: true}
            },
            email2: {
                type: DataTypes.STRING,
                allowNull:true,
                validate: {isEmail: true}
            },
            userId:DataTypes.UUID

        },
        {
            classMethods: {
                associate: function (models) {
                    Contact.hasMany(models.ContactGroup, {foreignKey: 'contact_id'});
                }
            }
        });

    return Contact;
};