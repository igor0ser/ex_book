(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddPostController', function(model, socket){
		var $ctrl = this;

		$ctrl.model = model;
		$ctrl.text = '';

		$ctrl.submit = function() {
			var post = {
				date: '' + new Date().getTime(),
				postAuthor: model.userName,
				postText: $ctrl.text,
				comments: []
			};

			socket.emit('post', post, (data) => {
				post._id = data;
				model.posts.push(post);
				$ctrl.text = '';
			});
		};

	});

})();