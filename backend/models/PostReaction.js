'Use strict'

module.exports = (sequelize, DataTypes) => {
    const PostReaction = sequelize.define('PostReaction', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        reaction: { 
            type: DataTypes.TEXT, 
            allowNull: false
        }        
    }, {
        charset: 'utf8mb4'
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