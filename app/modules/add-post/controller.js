(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddPostController', function(model, serverConnection, socket, $rootScope){
		var $ctrl = this;

		$ctrl.model = model;
		$ctrl.text = '';
		console.log(model);

		$ctrl.submit = function() {
			var post = {
				date: new Date().getTime(),
				postAuthor: model.userName,
				postText: $ctrl.text,
				comments: []
			};

			$ctrl.text = '';

			socket.emit('post', post, (data) => {
				post.id = data;
				//model.posts.unshift(post);
				$ctrl.text = '';
			});
		};

	});

})();