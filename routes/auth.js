const express = require('express');
const passport = require('passport');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/api-docs');
    }
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/auth/user', isAuthenticated, (req, res) => {
    res.status(200).json({
        loggedIn: true,
        user: {
            id: req.user._id,
            displayName: req.user.displayName,
            email: req.user.email,
        },
    });
});

module.exports = router;