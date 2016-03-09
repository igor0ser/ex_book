(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('header1', function(){
		return {
			templateUrl: '/modules/header/view.html',
			controller: 'HeaderController',
			controllerAs: 'vm',
			scope: {},
			replace: true
		};
	});

})();