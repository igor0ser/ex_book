(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalMessageController', function($stateParams){
		var $ctrl = this;
		$ctrl.mes = $stateParams.mes;
	});

})();