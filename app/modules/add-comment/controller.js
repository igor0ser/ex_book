(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddCommentController', function(model, socket){
		var $ctrl = this;

		$ctrl.text = '';

		$ctrl.submit = function() {
			var comment = {
				postId: $ctrl.postId,
				commentAuthor: model.userName,
				commentText: $ctrl.text,
				date: new Date().getTime()
			};

			socket.emit('comment', comment, (data) => {
				model.posts.filter(post => post._id === comment.postId)[0].comments.push(comment);
				$ctrl.text = '';
			});
		};
	});

})();
