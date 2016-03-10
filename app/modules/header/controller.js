(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('HeaderController', function($scope, model){
		var vm = this;
		vm.model = model;

		console.log(132);

		vm.signOut = function(){
			console.log('ddd');
			console.log(model.isLogined);
			model.isLogined = false;
		};

		vm.modal = function(){
			document.querySelector('.faden').classList.remove('d-n');
		};

	});

})();