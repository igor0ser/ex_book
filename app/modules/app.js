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

	app.run(function (socket, model){
		socket.on('post', function (data) {
			model.posts.unshift(data);
		});
		socket.on('comment', function (data) {
			model.posts.filter(item => item._id == data.id)[0].comments.push(data);
		});
	});

})();
