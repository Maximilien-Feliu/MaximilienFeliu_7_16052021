const models = require('../models');
const jwt = require('jsonwebtoken');           // import the token package

exports.addReaction = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded

    return models.PostReaction.create({
        reaction: req.body.reaction,
        UserId: userId,  
        PostId: req.params.id 
    })
    .then(() => res.status(201).json({ message: 'reaction added successfully !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.updateReaction = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded

    models.PostReaction.findOne({
        where : { 
            _id: req.params.id
        }
    })
    .then((reaction) => {
        if (reaction.UserId === userId) {
            reaction.update(req.body, {
                where: {
                    _id: req.params.id
                }
            })
            .then(() => {
                res.status(200).json({ message: 'reaction updated succefully !'})
            })
            .catch(error => {
                res.status(401).json({ error })
            })
        } else {
            res.status(400).json({ message: "not allowed to update"});
        }
    })
    .catch(() => {
        res.status(400).json({ message: 'reaction not found' });
    })
}

exports.deleteReaction = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded
    const admin = decodedToken.isAdmin;

    models.PostReaction.findOne({
        where: {
            _id: req.params.id
        }
    }).then((reaction) => {
        if (reaction.UserId === userId || admin === 1) {
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
        } else {
            res.status(400).json({ message: "not allowed to delete"});
        }
    }).catch(
        () => {
            res.status(400).json({ message: 'Reaction not found'});
        }
    )  
}