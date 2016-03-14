(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('comment', function(){
		return {
			templateUrl: '/modules/comment/view.html',
			scope: {
				author: '@',
				text: '@',
				date: '@'
			},
			replace: true
		};
	});

})();