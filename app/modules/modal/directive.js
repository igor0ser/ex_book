(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('modal', function(){
		return {
			templateUrl: '/modules/modal/view.html',
			scope: {},
			replace: true
		};
	});

})();