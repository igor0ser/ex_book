(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('modal', function(){
		return {
			templateUrl: '/modules/modal/view.html',
			controller: 'ModalController',
			controllerAs: 'vm',
			scope: {},
			replace: true
		};
	});

})();