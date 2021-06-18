/*****  set regexp for inputs  *****/

const emailRegExp = /^[\w-.éèîïàçùüöôœ]{1,40}[@]{1}[\w-éèîïàçùüöôœ]{1,40}[.]{1}[a-z]{2,3}$/;
const nameRegExp = /^[\w-., !'éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,100}$/;
const globalRegExp = /^[\w-.,\s\n\(\)!'"\?éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,300}$/;

exports.user = (req, res, next) => {
    if (emailRegExp.test(req.body.email) === false || nameRegExp.test(req.body.password) === false || nameRegExp.test(req.body.firstName) === false || nameRegExp.test(req.body.lastName) === false || nameRegExp.test(req.body.username) === false || nameRegExp.test(req.body.department) || globalRegExp.test(req.body.bio)) {

        return res.status(401).json({ message: 'Bad Request' });

    }else {
        next();
    };
};

exports.postOrComment = (req, res, next) => {
    if (globalRegExp.test(req.body.body) === false) {
        return res.status(401).json({ message: 'Bad Request' });
    }else {
        next();
    };
}
