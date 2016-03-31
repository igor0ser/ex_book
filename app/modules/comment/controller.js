(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('CommentController', function(model, $http){
		var $ctrl = this;
		$ctrl.model = model;

		$ctrl.del = function() {
			var comment = {
				postId: $ctrl.postId,
				commentAuthor: $ctrl.author,
				date: +$ctrl.date
			};
			console.log(comment);

			$http.post('delcomment', comment);
		};
	});

})();
