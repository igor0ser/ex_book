(function(){
	var app = angular.module('app', []);

	app.value('model', {
		posts: [],
		isLogined: true,
		userName: 'user',
		avatar: 'img/avatar3.jpg'
	});

	app.run(($http, model) => {
		$http
			.get('/posts')
			.success((data) => {
				for (var i = 0; i < data.length; i++) {
					model.posts.push(data[i]);
				}
			})
			.error(() => {
				console.log('error');
			});
	});


})();