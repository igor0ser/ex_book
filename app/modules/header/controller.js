(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('HeaderController', function($scope, model, modalService){
		var vm = this;
		vm.model = model;

		vm.signOut = function(){
			console.log('ddd');
			console.log(model.isLogined);
			model.isLogined = false;
		};

		vm.showModal = modalService.showModal;


	});

})();