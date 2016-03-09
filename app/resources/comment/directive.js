(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('comment', function(){
		return {
			templateUrl: '/resources/comment/view.html',
			scope: {
				author: '@',
				text: '@'
			},
			replace: true
		};
	});

})();