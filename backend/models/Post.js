'Use strict'

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    });
    Post.associate = (models) => {
        Post.belongsTo(models.User, { 
            foreignKeyConstraint: true,
            onDelete: 'cascade' 
        });
    };
    return Post;
}
