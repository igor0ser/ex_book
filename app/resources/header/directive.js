(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('header1', function(){
		return {
			templateUrl: '/resources/header/view.html',
			controller: 'HeaderController',
			controllerAs: 'vm',
			scope: {},
			replace: true
		};
	});

})();