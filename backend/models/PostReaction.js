'Use strict'

module.exports = (sequelize, DataTypes) => {
    const PostReaction = sequelize.define('PostReaction', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        like: {
            type: DataTypes.STRING(7),
            allowNull: true
        },
        laugh: {
            type: DataTypes.STRING(7),
            allowNull: true
        },
        heart: {
            type: DataTypes.STRING(7),
            allowNull: true
        },
        angry: {
            type: DataTypes.STRING(7),
            allowNull: true
        },
        applaud: {
            type: DataTypes.STRING(7),
            allowNull: true
        },
        cry: {
            type: DataTypes.STRING(7),
            allowNull: true
        }
    }); 
    PostReaction.associate = (models) => {
        PostReaction.belongsTo(models.User, { 
            foreignKey : { 
                allowNull: false
            },
            onDelete: 'cascade' 
        });
        PostReaction.belongsTo(models.Post, { 
            foreignKey : { 
                allowNull: false
            },
            onDelete: 'cascade' 
        });
    };
    return PostReaction;
}