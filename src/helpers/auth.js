const { model } = require("mongoose");

const helpers = {};


helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/users/signin');
}

helpers.isAdmin = (req, res, next) => {
    const user = req.user
    if (user.userType == 'userA') {
        return next();
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('torneo');
}

module.exports = helpers;