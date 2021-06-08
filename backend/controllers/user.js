const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');    
const fs = require('fs');    
const index = require('../models/index');

console.log(Object.keys(index));

/*****  create a new user   *****/
exports.signup = (req, res, next) => {                   
    
    const bufEmail = Buffer.from(req.body.email);

/*****  hash the password then save informations *****/
    bcrypt.hash(req.body.password, 10)                                              // 10 is the salt (how many times the hashage has to be executed)
    .then( (hash) => {

        return models.User.create({
            email: bufEmail.toString('hex'),
            password: hash, 
            firstName: req.body.firstName,
            lastName: req.body.lastName,  
            username: req.body.username,
            department: req.body.department,   
            bio: req.body.bio,  
            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,              // get the image segment in the url,                                     
            isAdmin: 0
        })
        .then(() => res.status(201).json({ message : 'User created succesfully !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {

    const bufEmail = Buffer.from(req.body.email);

    models.User.findOne({ where : { email: bufEmail.toString('hex') }})                               // find the unique email 
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)                            // compare passwords between entered hash and data base hash
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe inccorect !'});
            }
            res.status(200).json({                                                  // return a userId and a token if everything is ok
                userId: user._id,
                token: jwt.sign(                                                    // give the token to connect only one time and return the token for authentifying each requests
                    { userId: user._id },
                    process.env.SECRET_TOKEN,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ message: 'could not log you in' }))
    })
    .catch(error => res.status(500).json({ message: 'server problem' }));
};

exports.updateUser = (req, res, next) => {

    req.file ? (
        models.User.findOne({
            where: {
                _id: req.params.id
            }
        })
        .then((user) => {
            const filename = user.attachment.split('/images/')[1];                                   // get what comes after /images/ in the imageUrl (the filename)
            
            fs.unlinkSync(`images/${filename}`);
            
            let userObject = {
                ...req.body, 
                attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            
            user.update(userObject, {
                where: {
                    _id: req.params.id
                }
            }
            )
            .then(
                () => {
                    res.status(200).json({
                        message: 'User updated successfully !'
                    }); 
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
        models.User.update(req.body, {
            where: {
                _id: req.params.id
            }
        })
        .then(
            () => {
                res.status(200).json({
                    message: 'User updated successfully !'
                }); 
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

exports.getAllUsers = (req, res, next) => {
    models.User.findAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(400).json({ error: error })
    })
}

exports.getOneUser = (req, res, next) => {
    models.User.findOne({
        where: {
            _id: req.params.id
        }
    }).then(
        user => {                                     
            res.status(200).json(user);
        }
    ).catch(
        error => {
            res.status(404).json({
                error
            });
        }
    );
}

exports.deleteUser = (req, res, next) => {
    models.User.findOne({
        where: {
            _id: req.params.id
        }
    }).then((user) => {
        user.destroy({
            where: {
                _id: req.params.id
            }
        }).then(
            () => {                                     
                res.status(200).json({ message: 'User deleted successfully !'});
            }
        ).catch(
            error => {
                res.status(404).json({
                    error
                });
            }
        );
    })  
}