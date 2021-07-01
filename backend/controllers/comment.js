const models = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');           // import the token package

exports.createComment = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded

    return models.Comment.create({
        body: req.body.body,
        attachment: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
        UserId: userId,
        PostId: req.params.id
    })
    .then(() => res.status(201).json({ message : 'Comment added succesfully !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.updateComment = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded

    req.file ? (
        models.Comment.findOne({
            where: {
                _id: req.params.id
            }
        })
        .then((comment) => {
            if (comment.UserId === userId) {
                const filename = comment.attachment.split('/images/')[1];                                   // get what comes after /images/ in the imageUrl (the filename)
            
                fs.unlinkSync(`images/${filename}`);
                
                let commentObject = {
                    ...req.body, 
                    attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                
                comment.update(commentObject, {
                    where: {
                        _id: req.params.id
                    }
                }
                )
                .then(
                    () => {
                        res.status(200).json({ message : 'comment updated successfully !'}); 
                    }
                ).catch(
                    error => {
                        res.status(400).json({
                            error
                        });
                    }
                )
            } else {
                res.status(400).json({ message: "not allowed to update"});
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
        models.Comment.findOne({
            where: {
                _id: req.params.id
            }
        }).then((comment) => {
            if (comment.UserId === userId) {
                comment.update(req.body, {
                    where: {
                        _id: req.params.id
                    }
                })
                .then(
                    () => {
                        res.status(200).json({ message : 'comment updated successfully !'}); 
                    }
                ).catch(
                    error => {
                        res.status(400).json({
                            error
                        });
                    }
                )   
            } else {
                res.status(400).json({ message: "not allowed to update"});
            }
        })
    )
}

exports.getAllComments = (req, res) => {
    models.Comment.findAll()
    .then(comments => {
        res.status(200).json(comments);
    })
    .catch(error => {
        res.status(400).json({ error: error })
    })
}

exports.getOneComment = (req, res) => {
    models.Comment.findOne({
        where: {
            _id: req.params.id
        }
    }).then(
        comment => {                                     
            res.status(200).json(comment);
        }
    ).catch(
        error => {
            res.status(404).json({
                error
            });
        }
    );
}

exports.deleteComment = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded

    models.Comment.findOne({
        where: {
            _id: req.params.id
        }
    }).then((comment) => {
        if (comment.UserId === userId) {
            comment.destroy({
                where: {
                    _id: req.params.id
                }
            }).then(
                () => {                                     
                    res.status(200).json({ message: 'Comment deleted successfully !'});
                }
            ).catch(
                error => {
                    res.status(404).json({
                        error
                    });
                }
            );
        } else {
            res.status(400).json({ message: "not allowed to update"});
        }
    }).catch(
        () => {
            res.status(400).json({ message: 'Comment not found'});
        }
    )  
}