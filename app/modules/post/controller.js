(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('PostController', function($http){
		var $ctrl = this;
		$ctrl.butVisib = $ctrl.postObj.comments.length >= 3;

		$ctrl.getComments = function(){
			var comments = $ctrl.postObj.comments;
			var dataObj = {
				postId : $ctrl.postObj._id,
				lastCommentDate : comments[0].date
			};
			$http.post('getComments', dataObj)
				.then((data) => {
					console.log(data);
					$ctrl.butVisib = data.data.length >= 10;
					$ctrl.postObj.comments = data.data.concat(comments);
				});
		};
	});

})();
