(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ContainerController', function(model){
		var vm = this;

		vm.posts = model;


	});

})();
