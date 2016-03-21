(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ContainerController', function(model, serverConnection){
		var $ctrl = this;

		$ctrl.model = model;
		$ctrl.loadPosts = serverConnection.getData;
	});

})();
