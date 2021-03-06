/*****  set regexp for inputs  *****/

const emailRegExp = /^[\w-.œ]{1,40}[@]{1}[\w-œ]{1,40}[.]{1}[a-z]{2,4}$/;
const nameRegExp = /^[\w-.'éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,100}$/;
const departmentRegExp = /^[\w-.,/ "'éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,100}$/;
const passwordRegExp = /^[\w-., !/\\'éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,100}$/;
const globalRegExp = /^[\w-.,\s\n\(\)!'"\?:éèîïÉÈÎÏàçùüöôœÀÇÙÜÖÔ]{1,300}$/;

exports.user = (req, res, next) => {
    if (emailRegExp.test(req.body.email) === false || passwordRegExp.test(req.body.password) === false || nameRegExp.test(req.body.firstName) === false || nameRegExp.test(req.body.lastName) === false || departmentRegExp.test(req.body.department) === false ) {
     
        return res.status(401).json({ message: 'Bad Request' });    

    } else {
        return next();
    };
};
