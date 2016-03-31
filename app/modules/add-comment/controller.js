(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddCommentController', function(model, $http){
		var $ctrl = this;

		$ctrl.text = '';

		$ctrl.submit = function() {
			var comment = {
				postId: $ctrl.postId,
				commentAuthor: model.userName,
				commentText: $ctrl.text,
				date: new Date().getTime()
			};

			$http.post('/addcomment', comment)
				.then(() => $ctrl.text = '');
		};

	});

})();
