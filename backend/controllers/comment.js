const models = require('../models');
const fs = require('fs');

exports.createComment = (req, res, next) => {

    return models.Comment.create({
        body: req.body.body,
        attachment: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
        UserId: req.body.userId,
        PostId: req.params.postId
    })
    .then((comment) => res.status(201).json( comment ))
    .catch(error => res.status(400).json({ error }));
}

exports.updateComment = (req, res, next) => {

    req.file ? (
        models.Comment.findOne({
            where: {
                _id: req.params.id
            }
        })
        .then((comment) => {
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
                (comment) => {
                    res.status(200).json(comment); 
                }
            ).catch(
                error => {
                    res.status(400).json({
                        error
                    });
                }
            )
        })
        .catch(
            error => {
                res.status(500).json({
                    error
                });
            }
        )
    ) : (
        models.Comment.update(req.body, {
            where: {
                _id: req.params.id
            }
        })
        .then(
            () => {
                res.status(200).json(comment); 
            }
        ).catch(
            error => {
                res.status(400).json({
                    error
                });
            }
        )   
    )
}

exports.getAllComments = (req, res, next) => {
    models.Comment.findAll()
    .then(comments => {
        res.status(200).json(comments);
    })
    .catch(error => {
        res.status(400).json({ error: error })
    })
}

exports.deleteComment = (req, res, next) => {
    models.Comment.findOne({
        where: {
            _id: req.params.id
        }
    }).then((comment) => {
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
    }).catch(
        () => {
            res.status(400).json({ message: 'Comment not found'});
        }
    )  
}