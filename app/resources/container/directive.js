(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('container', function(){
		return {
			templateUrl: '/resources/container/view.html',
			controller: 'ContainerController',
			controllerAs: 'vm',
			scope: {},
			replace: true
		};
	});

})();