(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ContainerController', function(model){
		var $ctrl = this;

		$ctrl.model = model;
	});

})();
