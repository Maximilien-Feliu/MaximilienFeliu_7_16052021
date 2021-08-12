const models = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');           // import the token package
const { sequelize } = require('../models');


exports.createPost = (req, res) => {
    
    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded

    if (req.body.text || req.body.attachment) {
        return models.Post.create({
            text: req.body.text,
            attachment: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
            UserId: userId
        })
        .then(() => res.status(201).json({ message : "post added successfully !"}))
        .catch(error => res.status(400).json({ error }));
    }
} 

exports.updatePost = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded
    const admin = decodedToken.isAdmin;

    req.file ? (
        models.Post.findOne({
            where: {
                _id: req.params.id
            }
        })
        .then((post) => {
            if (post.UserId === userId || admin === 1) {
                const filename = post.attachment.split('/images/')[1];                                   // get what comes after /images/ in the imageUrl (the filename)
                
                fs.unlinkSync(`images/${filename}`);
                
                let postObject = {
                    ...req.body, 
                    attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                
                post.update(postObject, {
                    where: {
                        _id: req.params.id
                    }
                }
                )
                .then(
                    () => {
                        res.status(200).json({ message : 'post updated successfully !'}); 
                    }
                ).catch(
                    error => {
                        res.status(400).json({
                            error
                        });
                    }
                )
            } else {
                res.status(400).json({ message: "not allowed to update"})
            }
        })
        .catch(
            error => {
                res.status(500).json({
                    error
                });
            }
        )
    ) : (
        models.Post.findOne({
            where: {
                _id: req.params.id
            }
        }).then((post) => {
            if (post.UserId === userId || admin === 1) {
                post.update(req.body, {
                    where: {
                        _id: req.params.id
                    }
                })
                .then(
                    () => {
                        res.status(200).json({ message : 'post updated successfully !'}); 
                    } 
                ).catch(
                    error => {
                        res.status(400).json({
                            error
                        });
                    }
                ) 
            } else {
                res.status(400).json({ message: "not allowed to update"})
            }
        })  
    )
}

exports.getAllPosts = (req, res) => {
    models.Post.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: models.User,
                attributes: ['_id', 'firstName', 'lastName', 'attachment']
            },
            {
                model: models.Comment,
                separate: true, 
                order: [['createdAt', 'DESC']],
                attributes: ['_id', 'text', 'attachment'],
                include: [
                    {
                        model: models.User,
                        attributes: ['_id', 'firstName', 'lastName', 'attachment']
                    },
                    {
                        model: models.CommentReaction,
                        attributes: ['_id', 'reaction', 'UserId'],
                        separate: true,
                        include: [
                        { 
                            model: models.User,
                            attributes: ['_id', 'firstName', 'lastName', 'attachment']
                        }
                ]
                    }
                ]
            },
            {
                model: models.PostReaction,
                attributes: ['_id', 'reaction', 'UserId'],
                separate: true,
                include: [
                    {
                        model: models.User,
                        attributes: ['_id', 'firstName', 'lastName', 'attachment']
                    }
                ]
            }
        ],
    })
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(400).json({ error: error })
    })
}

exports.getOnePost = (req, res) => {
    models.Post.findOne({
        where: {
            _id: req.params.id
        }
    }).then(
        post => {                                     
            res.status(200).json(post);
        }
    ).catch(
        error => {
            res.status(404).json({
                error
            });
        }
    );
}

exports.deletePost = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded
    const admin = decodedToken.isAdmin;
    
    models.Post.findOne({
        where: {
            _id: req.params.id
        }
    }).then((post) => {
        if (post.UserId === userId || admin === 1) { 
            post.destroy({
                where: {
                    _id: req.params.id
                }
            }).then(
                () => {                                     
                    res.status(200).json({ message: 'Post deleted successfully !'});
                }
            ).catch(
                error => {
                    res.status(404).json({
                        error
                    });
                }
            )
        } else {
            res.status(400).json({ message: "not allowed to delete"});
        }
    }).catch(
        () => {
            res.status(400).json({ message: 'Post not found'});
        }
    )  
}