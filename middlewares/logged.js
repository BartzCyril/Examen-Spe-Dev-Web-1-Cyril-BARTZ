const logged = (req, res, next) => {
    if (!req.session || !req.session.loggedIn) {
        return res.status(403).redirect('/authentication/login');
    }

    next();
}

module.exports = logged;