(function(){
	var app = angular.module('app', ['ui.router']);

	app.value('model', {
			login: 'user',
			password: 'user'
			});
})();