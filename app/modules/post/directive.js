(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('post', function(){
		return {
			templateUrl: '/modules/post/view.html',
			scope: {
				postObj: '=',
				isLogined: '='
			},
			replace: true
		};
	});

})();