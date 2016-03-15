(function(){
	'use strict';

	var app = angular.module('app');

	app.component('modalSignup', {
		templateUrl: 'modules/modal/modal-signup/view.html',
		controller: 'ModalLoginController'
	});

})();