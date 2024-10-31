const express = require('express');
const User = require("../helper/User");
const authentication = express.Router();

authentication.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/countries');
        return;
    }
    res.render('login')
});

authentication.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).send('Username and password are required');
        return;
    }

    const createUser = await User.create(username, password);

    if (createUser.error) {
        res.status(createUser.status).send(createUser.message);
        return;
    }
    req.session.user = createUser.data.username;
    req.session.isAdmin = createUser.data.isAdmin;
    req.session.loggedIn = true;

    res.redirect('/countries');
});

authentication.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Internal server error');
            return;
        }

        res.redirect('/authentication/login');
    });
});

module.exports = authentication;