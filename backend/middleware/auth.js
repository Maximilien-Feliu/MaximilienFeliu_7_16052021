/***************************
            verify the token sent by the frontend application with each requests to authentify the userId
                                                                                        ****************************/

const jwt = require('jsonwebtoken');           // import the token package

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];                  // get the token in the authotization header (2nd in the array)
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);       // verify the token
        const userId = decodedToken.userId;                                     // get the userId when it's decoded
        if (req.body.userId && req.body.userId !== userId) {                    // verify a potential existing userId
            throw 'invalid user ID !';
        } else {
            next();
        }
    }catch (error) {
        res.status(401).json({
            error: error | 'invalid request !'
        }) 
    }
};