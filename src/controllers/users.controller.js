const res = require("express/lib/response");

const passport = require('passport');

const User = require('../models/User');

const usersCtrl = {};

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, phone, password, confirm_password } = req.body;
    if (name.length < 1) {
        errors.push({ text: 'Name cannot be empty' });
    }
    if (email.length < 1) {
        errors.push({ text: 'Email cannot be empty' });
    }
    if (phone.length < 10) {
        errors.push({ text: 'Phone must have at least 10 digits' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Passwords do not match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Paswords must be at last 4 characters.' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            phone,
            password,
            confirm_password
        })
    } else {
        const emailUser = await User.findOne({ email });
        const phoneUser = await User.findOne({ phone });

        if (emailUser) {
            req.flash('error_msg', 'The email is already in use.');
            res.redirect('/users/signup');
        } if (phoneUser) {
            req.flash('error_msg', 'The phone is already in use.');
            res.redirect('/users/signup');
        }
        else {
            const newUser = new User({ name, email, phone, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/terms');
        }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
}

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/torneo',
    failureFlash: true
})

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/signin');
};

module.exports = usersCtrl;