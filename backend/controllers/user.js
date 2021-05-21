const bcrypt = require( 'bcrypt');
const User = require( '../models/User.js');

/*****  create a new user   *****/
exports.signup = (req, res, next) => {

    const bufEmail = Buffer.from(req.body.email);                                   // handle raw binary data

/*****  hash the password then save informations *****/
    bcrypt.hash(req.body.password, 10)                                              // 10 is the salt (how many times the hashage has to be executed)
    .then(hash => {
        User.build({
            email: bufEmail.toString('hex'),
            username: req.body.username,    
            password: hash,                                        
            bio: req.body.bio
            
        });
        User.save()
        .then(() => res.status(201).json({ message : 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
