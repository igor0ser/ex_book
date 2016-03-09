(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('post', function(){
		return {
			templateUrl: '/resources/post/view.html',
			controller: 'PostController',
			controllerAs: 'vm',
			scope: {
				id: '@'
			},
			replace: true
		};
	});

})();