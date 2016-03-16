(function(){
	var app = angular.module('app', ['ui.router']);

	app.value('model', {
		posts: [],
		isLogined: true,
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
				template: ''
			})
			.state('modal', {
				template: '<modal />',
				abstract: true
			})
				.state('modal.login', {
					url: '/login',
					template: '<modal-login />'
				})
				.state('modal.signup', {
					url: '/signup',
					template: '<modal-signup />'
				})
				.state('modal.message', {
					template: '<modal-message />',
					params: {mes: null}
				});


	});

	app.run((socket) => {
		console.log(socket);
		socket.on('news', function (data) {
			console.log(data);
			socket.emit('my other event', { my: 'data' });
		});
	});

})();
