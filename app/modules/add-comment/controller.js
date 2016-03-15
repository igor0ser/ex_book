(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddCommentController', function(model, serverConnection){
		var $ctrl = this;

		$ctrl.text = '';

		$ctrl.submit = function() {
			var data = {
				id: $ctrl.postId,
				commentAuthor: model.userName,
				commentText: $ctrl.text,
				date: new Date().getTime()
			};

			serverConnection.sendData('/comment', data, () => $ctrl.text = '');
		};
	});

})();
