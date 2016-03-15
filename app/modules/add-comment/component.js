(function(){
	'use strict';

	var app = angular.module('app');

	app.component('addComment', {
		templateUrl: '/modules/add-comment/view.html',
		controller: 'AddCommentController',
		bindings: {
			postId: '@'
		}
	});

})();