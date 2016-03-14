(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalMessageController', function($stateParams){
		var vm = this;
		vm.mes = $stateParams.mes;
	});

})();