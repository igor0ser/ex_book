function checkAuth(req, res, author){
	if (req.user.login) {
		if (req.user.login === author) return true;
	} else if (req.user.profile) {
		if (req.user.profile.emails[0].value === author) return true;
	} 
	res.redirect('/#/werong');
	return false;
}

module.exports = checkAuth;