(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('CommentController', function(model, modelChanger, socket){
		var $ctrl = this;
		$ctrl.model = model;

		$ctrl.del = function() {
			var comment = {
				postId: $ctrl.postId,
				commentAuthor: $ctrl.author,
				date: +$ctrl.date
			};

			socket.emit('remove comment', comment, () => {
				modelChanger.removeComment(comment);
			});
		};
	});

})();
