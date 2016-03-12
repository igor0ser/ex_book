(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('addComment', function(){
		return {
			templateUrl: '/modules/add-comment/view.html',
			controller: 'AddCommentController',
			controllerAs: 'vm',
			scope: {
				id: '@'
			},
			replace: true
		};
	});

})();