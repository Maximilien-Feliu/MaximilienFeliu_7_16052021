'Use strict'

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true 
        },
        text: {
            type: DataTypes.TEXT, 
            allowNull: true
        },
        attachment: { 
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        charset: 'utf8mb4'
    }); 
    Post.associate = (models) => {  
        Post.belongsTo(models.User, { 
            foreignKey : { 
                allowNull: false
            },
            onDelete: 'cascade' 
        });
        Post.hasMany(models.Comment);
        Post.hasMany(models.PostReaction);
    };
    return Post;
}
