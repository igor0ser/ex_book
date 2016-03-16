(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddPostController', function(model, serverConnection, socket){
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

			//model.posts.push(post);

			//serverConnection.sendData('/post', post, () => $ctrl.text = '');

			socket.emit('post', post, function (data){
				console.log('data = ', data);
				post.id = data;
				model.posts.push(post);
				console.log(model);
			});
		};

	});

})();