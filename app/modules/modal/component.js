(function(){
	'use strict';

	var app = angular.module('app');

	app.component('modal', {
		templateUrl: '/modules/modal/view.html',
		controller: 'ModalController'
	});

})();