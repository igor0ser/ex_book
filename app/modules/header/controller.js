(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('HeaderController', function($scope, model){
		var vm = this;
		vm.isLogined = model.isLogined;
		vm.userName = model.userName;
		vm.avatar = model.avatar;

		vm.signOut = function(){
			model.isLogined = false;
		};

		vm.modal = function(){
			document.querySelector('.faden').classList.remove('d-n');
		};

	});

})();