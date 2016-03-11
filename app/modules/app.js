(function(){
	var app = angular.module('app', []);

	app.value('model', {
		posts: [],
		isLogined: true,
		userName: 'user',
		avatar: 'img/avatar0.jpg'
	});

	app.run((getPosts) => {
		getPosts.get();
	});
})();