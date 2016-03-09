(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('HeaderController', function($scope, user){
		var vm = this;
		console.log(user);
		vm.user = user;
		vm.isLogined = !!user;


		vm.signOut = function(){
			user = null;
			vm.isLogined = !!user;
		};

		vm.modal = function(){
			document.querySelector('.faden').classList.remove('d-n');
		}

	});

})();
