(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('modalMessage', function(){
		return {
			templateUrl: 'modules/modal/modal-message/view.html',
			controller: 'ModalMessageController',
			controllerAs: 'vm',
			scope: {},
			replace: true
		};
	});

})();