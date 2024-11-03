const association = (req, res, next) => {
    if (!req.session || !req.session.loggedIn || !req.session.isMemberOfAssociation) {
        res.status(403).redirect('/countries');
        return;
    }
    next();
}

module.exports = association;