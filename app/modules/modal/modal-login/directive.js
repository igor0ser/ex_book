(function(){
	'use strict';

	var app = angular.module('app');

	app.directive('modalLogin', function(){
		return {
			templateUrl: 'modules/modal/modal-login/view.html',
			replace: true,
			controller: 'ModalLoginController',
			controllerAs: 'vm'
		};
	});

})();