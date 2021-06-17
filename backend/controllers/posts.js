const models = require('../models');
const fs = require('fs');

exports.createPost = (req, res, next) => {

    return models.Post.create({
        body: req.body.body,
        attachment: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
        UserId: req.params.id
    })
    .then((post) => res.status(201).json( post ))
    .catch(error => res.status(400).json({ error }));
}

exports.updatePost = (req, res, next) => {

    req.file ? (
        models.Post.findOne({
            where: {
                _id: req.params.id
            }
        })
        .then((post) => {
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
                (post) => {
                    res.status(200).json(post); 
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
        models.Post.update(req.body, {
            where: {
                _id: req.params.id
            }
        })
        .then(
            () => {
                res.status(200).json(post); 
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

exports.getAllPosts = (req, res, next) => {
    models.Post.findAll()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(400).json({ error: error })
    })
}

exports.getOnePost = (req, res, next) => {
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

exports.deletePost = (req, res, next) => {
    models.Post.findOne({
        where: {
            _id: req.params.id
        }
    }).then((post) => {
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
        );
    }).catch(
        () => {
            res.status(400).json({ message: 'Post not found'});
        }
    )  
}