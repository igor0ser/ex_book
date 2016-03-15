(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalController', function(closeModal){
		var $ctrl = this;
		$ctrl.closeModal = closeModal;
	});

})();