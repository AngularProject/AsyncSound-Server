function isAdminUser(req, res, next) {
    if (!req.user || req.user.roles.indexOf("admin") < 0) {
        return;
    } else {
        next();
    }
}

function isUserLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        return;
        // res.redirect("/auth/login");
    }
}

module.exports = {
    isAdminUser,
    isUserLoggedIn
}