(function(){
	'use strict';

	var app = angular.module('app');

	app.component('modalMessage',{
		templateUrl: 'modules/modal/modal-message/view.html',
		controller: 'ModalMessageController'
	});

})();