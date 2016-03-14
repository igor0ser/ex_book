(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('modalSignup', function(){
		return {
			templateUrl: 'modules/modal/modal-signup/view.html',
			replace: true,
			controller: 'ModalLoginController',
			controllerAs: 'vm'
		};
	});

})();