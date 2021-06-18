const models = require('../models');

exports.addReaction = (req, res, next) => {
    return models.CommentReaction.create({
        like: req.body.like,
        laugh: req.body.laugh,
        heart: req.body.heart,
        angry: req.body.angry,
        applaud: req.body.applaud,
        userId: req.body.userId,
        commentId: req.params.commentId
    })
    .then((react) => res.status(201).json(react))
    .catch(error => res.status(400).json({ error }));
}

exports.getAllReactions = (req, res, next) => {
    models.CommentReaction.findAll()
    .then(reactions => {
        res.status(200).json(reactions);
    })
    .catch(error => {
        res.status(400).json({ error: error })
    })
}

exports.updateReaction = (req, res, next) => {
    models.CommentReaction.findOne({
        where : {
            _id: req.params.id
        }
    })
    .then((react) => {
        react.update(req.body, {
            where: {
                _id: req.params.id
            }
        })
        .then(react => {
            res.status(200).json(react)
        })
        .catch(error => {
            res.status(401).json({ error })
        })
    })
    .catch(() => {
        res.status(400).json({ message: 'post not found' });
    })
}

exports.deleteReaction = (req, res, next) => {
    models.CommentReaction.findOne({
        where: {
            _id: req.params.id
        }
    }).then((reaction) => {
        reaction.destroy({
            where: {
                _id: req.params.id
            }
        }).then(
            () => {                                     
                res.status(200).json({ message: 'Reaction deleted successfully !'});
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
            res.status(400).json({ message: 'Reaction not found'});
        }
    )  
}