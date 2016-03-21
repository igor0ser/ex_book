(function(){
	var app = angular.module('app', ['ui.router']);

	app.value('model', {
		posts: [],
		isLogined: true,
		userName: 'john',
		filter: '',
		lastPost: ''
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
				})
				.state('modal.load', {
					url: '/load',
					template: '<modal-load />'
				});


	});

	app.run(function (socket, model, modelChanger){
		socket.on('post', function (post) {
			modelChanger.addPost(post);
		});
		socket.on('comment', function (comment) {
			modelChanger.addComment(comment);
		});
		socket.on('remove comment', function (comment) {
			modelChanger.removeComment(comment);
		});
	});

})();
