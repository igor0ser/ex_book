function checkAuth(req, author){
	if (req.user.login) {
		return req.user.login === author;
	} else if (req.user.profile) {
		return req.user.profile.emails[0].value === author;
	} else {
		return false;
	}
}

module.exports = checkAuth;