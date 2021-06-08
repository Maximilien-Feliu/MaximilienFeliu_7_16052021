'Use strict'

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: { 
            type: DataTypes.STRING(50), 
            allowNull: false
        },
        password: { 
            type: DataTypes.STRING(255), 
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(75),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(75),
            allowNull: false
        },
        username: { 
            type: DataTypes.STRING(75), 
            allowNull: true
        },
        department: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        bio: { 
            type: DataTypes.TEXT, 
            allowNull: true
        },
        attachment: { 
            type: DataTypes.STRING(255), 
            allowNull: true
        },
        isAdmin: {
            type: DataTypes.TINYINT,
            allowNull: false, 
            default: 0
        }
    });
    User.associate = (models) => { 
        User.hasMany(models.Post);
    };
    return User; 
}






