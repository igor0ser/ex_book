(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('HeaderController', function(model){
		var $ctrl = this;
		$ctrl.model = model;
		$ctrl.userFilter = '';

		$ctrl.signOut = function(){
			model.isLogined = false;
			model.userName = '';
		};

	});

})();