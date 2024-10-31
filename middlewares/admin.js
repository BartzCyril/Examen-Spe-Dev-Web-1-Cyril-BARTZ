const admin = (req, res, next) => {
    if (!req.session || !req.session.loggedIn || !req.session.isAdmin) {
        res.status(403).redirect('/countries');
        return;
    }
    next();
}

module.exports = admin;