(function(){
	var app = angular.module('app', ['ui.router']);

	app.value('model', {
		posts: [],
		isLogined: false,
		userName: 'user',
		avatar: 'img/avatar0.jpg'
	});

	app.run((serverConnection) => {
		serverConnection.getData();
	});

	app.config(($stateProvider, $urlRouterProvider) => {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				template: '<h1>hrllpo</h1>'
			})
			.state('modals', {
				template: '<modal></modal',
				abstract: true
			})
			.state('modals.login', {
				url: '/login',
				template: '<h1>hrlllo121314313</h1>'
			});

	});


})();