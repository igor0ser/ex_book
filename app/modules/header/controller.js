(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('HeaderController', function(model, modalService){
		var vm = this;
		vm.model = model;

		vm.signOut = function(){
			model.isLogined = false;
		};

		vm.showModal = modalService.showModal;
	});

})();