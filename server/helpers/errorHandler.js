function errorHandler(err){
	if (err) {
		console.err(err);
		res.redirect('/#/error');
	}
}

module.exports = errorHandler;