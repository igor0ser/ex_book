(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalController', function($scope, model){
		var vm = this;

		vm.close = function () {
			document.querySelector('.faden').classList.add('d-n');
		};

	});

})();