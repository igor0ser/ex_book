(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('addPost', function(){
		return {
			templateUrl: '/modules/add-post/view.html',
			controller: 'AddPostController',
			controllerAs: 'vm',
			scope: {},
			replace: true
		};
	});

})();