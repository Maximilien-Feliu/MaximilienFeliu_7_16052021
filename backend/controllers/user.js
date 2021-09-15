const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');    
const fs = require('fs');    
const { Op } = require("sequelize");

const nameRegExp = /^[\w-.'éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,100}$/;
const departmentRegExp = /^[\w-.,/ "'éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,100}$/;
const globalRegExp = /^[\w-.,\s\n\(\)!'"\?:éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,300}$/;

/*****  create a new user   *****/
exports.signup = (req, res) => {                   
    
    const bufEmail = Buffer.from(req.body.email);

/*****  hash the password then save informations *****/
    bcrypt.hash(req.body.password, 10)                                              // 10 is the salt (how many times the hashage has to be executed)
    .then((hash) => {
        return models.User.create({
            email: bufEmail.toString('hex'),  
            password: hash, 
            firstName: req.body.firstName,
            lastName: req.body.lastName,   
            department: req.body.department,   
            bio: req.body.bio,  
            attachment: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : 'http://localhost:3000/images/profile_default.jpg',              // get the image segment in the url,                                     
            isAdmin: 0 
        })
        .then(() => res.status(201).json({ message : 'User created succesfully !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
 
    const bufEmail = Buffer.from(req.body.email);

    models.User.findOne({ where : { email: bufEmail.toString('hex') }})                               // find the unique email 
    .then(user => {
        if (!user) {
            return res.status(400).json({ error: 'user not found !'});  
        }
        bcrypt.compare(req.body.password, user.password)                            // compare passwords between entered hash and data base hash
        .then(valid => {
            if (!valid) {
                return res.status(400).json({ error: 'incorrect password !'});
            }
            res.status(200).json({                                                  // return a userId and a token if everything is ok
                userId: user._id,
                token: jwt.sign(                                                    // give the token to connect only one time and return the token for authentifying each requests
                    { 
                        userId: user._id,
                        isAdmin: user.isAdmin
                    },
                    process.env.SECRET_TOKEN,   
                    { expiresIn: '5d' }
                )
            });
        })
        .catch(() => res.status(500).json({ message: 'cannot log you in' }))
    })
    .catch(() => res.status(500).json({ message: 'server problem' }));
};

exports.updateUser = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded
    const admin = decodedToken.isAdmin;
    const fileDefault = 'http://localhost:3000/images/profile_default.jpg';

    req.file ? (
        models.User.findOne({
            where: {
                _id: req.params.id
            }
        })
        .then((user) => {
            if (nameRegExp.test(req.body.firstName) && nameRegExp.test(req.body.lastName) && departmentRegExp.test(req.body.department) && globalRegExp.test(req.body.bio)) {
                if (user._id === userId || admin === 1) {  
                    
                    if(user.attachment != fileDefault) {
                        const filename = user.attachment.split('/images/')[1];                                   // get what comes after /images/ in the imageUrl (the filename)
                        fs.unlinkSync(`images/${filename}`);
                    }
                    
                    let userObject = {
                        ...req.body, 
                        attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    
                    user.update(userObject, {
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
                } else {
                    const filename = req.file.filename;                             
                    fs.unlinkSync(`images/${filename}`);

                    res.status(403).json({ message: "not allowed to update"});
                }
            } else {
                res.status(401).json({
                    message: 'Bad Request'
                });
            }   
        })
        .catch(
            error => {
                res.status(500).json({
                    message: error
                });
            } 
        )
    ) : (
        models.User.findOne({
            where: {
                _id: req.params.id
            }
        })
        .then((user) => {
            if (nameRegExp.test(req.body.firstName) && nameRegExp.test(req.body.lastName) && departmentRegExp.test(req.body.department) && globalRegExp.test(req.body.bio)) {
                if (user._id === userId || admin === 1) {
                    user.update(req.body, {
                        where: {
                            _id: req.params.id
                        }
                    })
                    .then(
                        res.status(200).json({
                            message: 'User updated successfully !'
                        })
                    )
                    .catch(
                        error => {
                            res.status(400).json({
                                error
                            });
                        }
                    ) 
                } else {
                    res.status(403).json({ message: "not allowed to update"});
                }
            } else {
                res.status(401).json({
                    message: 'Bad Request'
                });
            }      
        }) 
    )
}

exports.getAllUsers = (req, res) => {
    models.User.findAll({
        where: {
            firstName: {
                [Op.like]: '%' + req.body.firstName + '%'
            }
        }
    })
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(400).json({ error: error })
    })
}

exports.getOneUser = (req, res) => {
    models.User.findOne({
        where: {
            _id: req.params.id
        }
    }).then(
        user => {                                     
            res.status(200).json({
                _id: user._id,
                isAdmin: user.isAdmin,
                attachment: user.attachment,
                bio: user.bio,
                department: user.department,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt
            });
        }
    ).catch(
        error => {
            res.status(404).json({
                error
            });
        }
    );
}

exports.deleteUser = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
    const userId = decodedToken.userId;                                     // get the userId when it's decoded
    const admin = decodedToken.isAdmin;
    const fileDefault = 'http://localhost:3000/images/profile_default.jpg';

    models.User.findOne({
        where: {
            _id: req.params.id
        }
    }).then((user) => {
        if (user._id === userId || admin === 1) {

            if(user.attachment != fileDefault) {
                const filename = user.attachment.split('/images/')[1];                                   // get what comes after /images/ in the imageUrl (the filename)
                fs.unlinkSync(`images/${filename}`);
            }

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
        } else {
            res.status(400).json({ message: "not allowed to delete"})
        }  
    })  
}