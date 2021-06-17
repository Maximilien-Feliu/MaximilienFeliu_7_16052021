const models = require('../models');

exports.addReaction = (req, res, next) => {
    return models.PostReaction.create({
        like: req.body.like,
        laugh: req.body.laugh,
        heart: req.body.heart,
        angry: req.body.angry,
        applaud: req.body.applaud
    })
    .then((react) => res.status(201).json(react))
    .catch(error => res.status(400).json({ error }));
}

exports.getAllReactions = (req, res, next) => {
    models.PostReaction.findAll()
    .then(reactions => {
        res.status(200).json(reactions);
    })
    .catch(error => {
        res.status(400).json({ error: error })
    })
}