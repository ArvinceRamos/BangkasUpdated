const User = require('../models/User');
const passport = require('passport');

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send('User created');
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).send(info.message);
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.send(user);
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout();
    res.send('Logged out');
};

module.exports = { signup, login, logout };
