const express = require('express');
const User = require('../helper/User');
const users = express.Router();
const adminMiddleware = require('../middlewares/admin');

users.get('/', adminMiddleware, async (req, res) => {
    const users = User.getAll();
    res.status(200).render('users', users.map(user => {
        return {
            username: user.username,
            role: user.role
        }
    }));
});

users.put('/', adminMiddleware, async (req, res) => {
    const {username, role} = req.body;
    const updateRole = await User.updateRole(username, role);

    if (updateRole.error) {
        res.status(updateRole.status).send(updateRole.message);
        return;
    }

    res.status(updateRole.status).redirect('/users');
});

users.delete('/:username', adminMiddleware, async (req, res) => {
    const username = req.params.username;
    const deleteUser = await User.delete(username);

    if (deleteUser.error) {
        res.status(deleteUser.status).send(deleteUser.message);
        return;
    }

    res.status(deleteUser.status).redirect('/users');
});
