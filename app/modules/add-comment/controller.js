(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddCommentController', function(model, serverConnection, socket){
		var $ctrl = this;

		$ctrl.text = '';

		$ctrl.submit = function() {
			var data = {
				id: $ctrl.postId,
				commentAuthor: model.userName,
				commentText: $ctrl.text,
				date: new Date().getTime()
			};

			//serverConnection.sendData('/comment', data, () => $ctrl.text = '');
			socket.emit('comment', data, (dataCB) => {
				//post.id = data;
				//model.posts.unshift(post);
				model.posts.filter(item => item._id == data.id)[0].comments.push(data);
				$ctrl.text = '';
			});
		};
	});

})();
