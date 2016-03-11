(function(){
	var app = angular.module('app', []);

	app.value('model', {
		posts: [],
		isLogined: false,
		userName: '',
		avatar: ''
	});

	app.service('getPosts', function($http, model){
		console.log(2);
		this.get = () => {
			$http
				.get('/model')
				.success((data) => {
					model.posts = data;
				})
				.error(() => {
					console.log('error');
				});
		};
		return this;
	});

	app.run(($http, model, getPosts) => {
		console.log(getPosts);
		getPosts.get();
/*		$http
			.get('/model')
			.success((data) => {
				model.posts = data;
			})
			.error(() => {
				console.log('error');
			});
*/	});
})();